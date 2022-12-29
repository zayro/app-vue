<template>
  <div class="container-avatar">
    <div>
      <!-- Select a picture for cropping -->
      <section class="section">
        <!-- Set a button that invokes selecting an image -->
        <button class="select-picture">
          <span> Abrir imagen</span>
          <input
            ref="uploadInput"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="selectFile"
          />
        </button>
      </section>

      <!-- Crop result preview -->
      <section v-if="result.dataURL && result.blobURL" class="section">
        <p>Preview dataURL</p>
        <div class="preview">
          <img :src="result.dataURL" />
        </div>
        <p>Preview blobURL</p>
        <div class="preview">
          <img :src="result.blobURL" />
        </div>
      </section>
    </div>

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->

    <div v-if="isShowModal">
      <div class="tools">
        <button class="btn" @click="isShowModal = false">Cancelar</button>
        <button class="btn primary" @click="getResult">Agregar</button>
      </div>

      <div class="cropper-content">
        <!-- The component imported from `vue-picture-cropper` plugin -->
        <VuePictureCropper
          :box-style="{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f8f8',
            margin: 'auto'
          }"
          :img="pic"
          :options="{
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            cropBoxResizable: false
          }"
          :preset-mode="{
            mode: 'round',
            width: 250,
            height: 250
          }"
        />
      </div>
    </div>
    <!--End Component -->
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
// Replace `../../lib` with `vue-picture-cropper`
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

export default defineComponent({
  components: {
    VuePictureCropper
  },
  setup () {
    const isShowModal = ref(false)
    const uploadInput = ref(null)
    const pic = ref('')
    const result = reactive({
      dataURL: '',
      blobURL: ''
    })

    /**
     * Select the picture to be cropped
     */
    function selectFile (e) {
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const { files } = e.target
      if (!files || !files.length) return

      // Convert to dataURL and pass to the cropper component
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the
        isShowModal.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }
    }

    /**
     * Get cropping results
     */
    async function getResult () {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: 'imagen'
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      isShowModal.value = false
    }

    return {
      uploadInput,
      pic,
      result,
      isShowModal,

      // Methods
      selectFile,
      getResult
    }
  }
})
</script>

<style scoped>
.container-avatar {
  margin-top: 20px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.cropper-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px;
}

.select-picture {
  position: relative;
  line-height: 38px;
  font-size: 14px;
  color: white;
  border-color: #42d392;
  background-color: #33a06f;
  border-radius: 20px;
  padding: 0 40px;
  margin-bottom: 1em;
}

.select-picture:hover {
  border-color: grey;
  color: white;
  background-color: #343a40;
}
.select-picture input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
  cursor: pointer;
  opacity: 0;
}

.preview {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1em;
}
.preview img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>

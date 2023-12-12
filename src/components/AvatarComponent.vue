<script>
import { defineComponent, reactive, ref } from 'vue'
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

<template>
  <div class="flex-container">
    <div class="main">
      <div class="card card-body">
        <div class="card-tools">
          <div class="card-title">Imagen</div>
        </div>
        <div class="container-avatar">
          <!-- Select a picture for cropping -->
          <section class="section">
            <!-- Set a button that invokes selecting an image -->
            <button class="select-picture btn btn-primary">
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
          <section v-if="result.dataURL && result.blobURL" class="section d-flex flex-row just-content-around">
            <div>
              <p class="text-center text-uppercase fs-5 fw-semibold">Preview dataURL</p>
              <div class="preview">
                <img :src="result.dataURL" />
              </div>
            </div>
            <div>
              <p class="text-center text-uppercase fs-5 fw-semibold">Preview blobURL</p>
              <div class="preview">
                <img :src="result.blobURL" />
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- A Popup for cropping -->
      <!-- You can replace it with the framework's Modal component -->

      <div v-if="isShowModal">
        <div class="card card-body">
          <div class="tools">
            <button class="btn btn-primary" @click="getResult">Agregar</button>
            <button class="btn btn-secondary" @click="isShowModal = false">Cancelar</button>
          </div>
          <div class="cropper-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper
              :box-style="{
                width: '50%',
                height: '40%',
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
      </div>
      <!--End Component -->
    </div>
  </div>
</template>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
.container-avatar {
  margin-top: 20px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.cropper-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 12px;
}

.select-picture input {
  top: 0;
  left: 0;
  width: 80px;
  height: 20px;
  font-size: 0;
  cursor: pointer;
  opacity: 0;
}

.preview {
  display: flex;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1em;
}
.preview img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>

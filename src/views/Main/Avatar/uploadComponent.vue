<template>
  <div class="example-drag">
    <div class="upload">
      <ul v-if="files.length">
        <li v-for="file in files" :key="file.id">
          <span>{{ file.name }}</span> - <span> <img :src="file.blob" width="50" height="50" /></span> -
          <span>{{ file.size }}</span> -
          <span v-if="file.error">{{ file.error }}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <ul v-else>
        <td colspan="7">
          <div class="text-center p-5">
            <h4>Drop files anywhere to upload<br />or</h4>
            <label for="file" class="btn btn-lg btn-primary">Select Files</label>
          </div>
        </td>
      </ul>

      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>

      <div class="example-btn">
        <file-upload
          ref="upload"
          v-model="files"
          class="btn btn-primary"
          :custom-action="customAction"
          :multiple="true"
          :drop="true"
          :drop-directory="true"
          @input-filter="inputFilter"
        >
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button
          v-if="!$refs.upload || !$refs.upload.active"
          type="button"
          class="btn btn-success"
          @click.prevent="$refs.upload.active = true"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button v-else type="button" class="btn btn-danger" @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import FileUpload from 'vue-upload-component'
import { ref } from 'vue'

const files = ref([])

async function customAction (file, component) {
  console.log('🚧 - customAction - component', component)
  console.log('🚧 - customAction - file', file)

  // return await component.uploadPut(file)
}

function inputFilter (newFile, oldFile, prevent) {
  if (newFile && !oldFile) {
    // Add file

    // Filter non-image file
    // Will not be added to files
    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
      return prevent()
    }

    // Create the 'blob' field for thumbnail preview
    newFile.blob = ''
    const URL = window.URL || window.webkitURL
    if (URL && URL.createObjectURL) {
      newFile.blob = URL.createObjectURL(newFile.file)
    }
  }

  if (newFile && oldFile) {
    // Update file

    // Increase the version number
    if (!newFile.version) {
      newFile.version = 0
    }
    newFile.version++
  }

  if (!newFile && oldFile) {
    // Remove file
    // Refused to remove the file
    // return prevent()
  }
}
</script>

<style scoped>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
.example-drag .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}
.example-drag .drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>

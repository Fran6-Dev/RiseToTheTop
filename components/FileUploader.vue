<template>
  <div class="space-y-3">
    <input
      type="file"
      @change="onFileChange"
      accept="image/*,video/*"
      class="block w-full"
    />

    <div v-if="previewUrl" class="mt-2">
      <img v-if="file?.type?.startsWith('image/')" :src="previewUrl" alt="preview" class="max-h-48 rounded" />
      <video v-else-if="file?.type?.startsWith('video/')" :src="previewUrl" controls class="max-h-48 rounded" />
    </div>

    <button
      :disabled="!file || uploading"
      @click="upload"
      class="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
    >
      {{ uploading ? 'Upload en cours…' : 'Charger le fichier' }}
    </button>

    <div v-if="uploading" class="w-full bg-gray-200 rounded h-2">
      <div class="h-2 bg-blue-500 rounded" :style="{ width: progress + '%' }"></div>
    </div>

    <p v-if="errorMsg" class="text-red-600 text-sm">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const uploading = ref(false)
const progress = ref<number>(0)
const errorMsg = ref<string | null>(null)

// (facultatif) prévisualisation pour images
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const f = input.files?.[0] || null
  file.value = f || null
  errorMsg.value = null
  progress.value = 0

  if (f && (f.type.startsWith('image/') || f.type.startsWith('video/'))) {
    previewUrl.value = URL.createObjectURL(f)
  } else {
    previewUrl.value = null
  }

  const MAX_SIZE = 50 * 1024 * 1024 // 50 Mo
  if (f && f.size > MAX_SIZE) {
    errorMsg.value = 'La vidéo est trop lourde (max 50 Mo).'
    file.value = null
    return
  }


}

async function upload() {
  if (!file.value) {
    errorMsg.value = 'Choisis un fichier d’abord.'
    return
  }

  try {
    uploading.value = true
    errorMsg.value = null
    progress.value = 0

    // 1) Demande une URL signée à ton endpoint Nitro
    const filename = `${crypto.randomUUID()}-${file.value.name}`
    const presign = await $fetch<{ url: string; key: string; contentType: string }>(
      '/api/r2/presign',
      {
        method: 'PUT',
        body: { filename, contentType: file.value.type || 'application/octet-stream' },
      }
    )

    // 2) Upload direct vers R2 (PUT sur l’URL signée)
    // fetch ne donne pas le "progress" nativement; pour une vraie barre, on peut passer par XMLHttpRequest :
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', presign.url)
      xhr.setRequestHeader('Content-Type', file.value!.type || 'application/octet-stream')

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          progress.value = Math.round((e.loaded / e.total) * 100)
        }
      }
      xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)))
      xhr.onerror = () => reject(new Error('Erreur réseau pendant l’upload'))
      xhr.send(file.value)
    })

    // 3) Sauvegarde la "key" dans ta BDD côté serveur (ex: avatarKey)
    // Adapte l’URL/route à ton projet
    const isVideo = file.value.type.startsWith('video/')

    

    await $fetch(isVideo ? '/api/user/video' : '/api/user/photo', {
      method: 'POST',
      body: { key: presign.key, contentType: file.value.type, originalName: file.value.name },
    })

    await reloadNuxtApp()

    // Reset / succès
    progress.value = 100
  } catch (err: any) {
    console.error(err)
    errorMsg.value = err?.message || 'Upload échoué'
  } finally {
    uploading.value = false
  }

  
}

async function chargePage() {
  navigateTo('/MyInfos', { replace: true })
}
</script>


import { ref } from 'vue'

import { CONSTANT } from '@/environments'

export function usePouchDb () {
  const PouchDB = window.PouchDB

  const db = ref(null)

  db.value = new PouchDB(CONSTANT.URL.COUCHDB) // Create PouchDB instance

  const createDocument = async (doc) => {
    await db.value.put(doc) // Create a document in the database
  }

  const getDocument = async (id) => {
    const doc = await db.value.get(id) // Retrieve a document by ID
    return doc
  }

  const allDocs = async () => {
    const docs = await db.value.allDocs({ include_docs: true }) // Retrieve all documents
    return docs
  }

  return { db, createDocument, getDocument, allDocs }
}

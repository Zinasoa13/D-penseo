<template>
  <div class="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 animate-fade-in">
    <!-- Sidebar -->
    <div class="w-72 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl border-r border-violet-500/20 animate-slide-in-left">
      <div class="p-6 border-b border-violet-500/30 shadow-lg">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2 animate-bounce-in">
          <span class="text-2xl animate-pulse">💰</span>
          Tableau de bord
        </h2>
      </div>
      
      <nav class="p-6">
        <ul class="space-y-3">
          <li class="animate-slide-in-left" style="animation-delay: 0.1s;">
            <button @click="activeSection = 'accueil'"
                    :class="activeSection === 'accueil' 
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-violet-400 shadow-xl shadow-violet-500/25' 
                      : 'text-slate-300 hover:bg-slate-700/50 border-transparent hover:shadow-lg'"
                    class="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
              <span class="text-lg">🏠</span>
              Accueil
            </button>
          </li>
          <li class="animate-slide-in-left" style="animation-delay: 0.2s;">
            <button @click="activeSection = 'depenses'"
                    :class="activeSection === 'depenses' 
                      ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white border-red-400 shadow-xl shadow-red-500/25' 
                      : 'text-slate-300 hover:bg-slate-700/50 border-transparent hover:shadow-lg'"
                    class="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
              <span class="text-lg">💸</span>
              Liste des dépenses
            </button>
          </li>
          <li class="animate-slide-in-left" style="animation-delay: 0.3s;">
            <button @click="activeSection = 'revenus'"
                    :class="activeSection === 'revenus' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-400 shadow-xl shadow-green-500/25' 
                      : 'text-slate-300 hover:bg-slate-700/50 border-transparent hover:shadow-lg'"
                    class="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105">
              <span class="text-lg">💰</span>
              Liste des revenus
            </button>
          </li>
        </ul>
        
        <!-- Added logout button at bottom of sidebar -->
        <div class="mt-8 pt-6 border-t border-violet-500/30">
          <button @click="logout"
                  class="w-full text-left px-4 py-3 rounded-xl border-2 border-transparent text-slate-300 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 hover:text-white hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 font-medium flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 animate-slide-in-left"
                  style="animation-delay: 0.4s;">
            <span class="text-lg">🚪</span>
            Déconnexion
          </button>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 animate-slide-in-right">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-8 flex items-center gap-3 animate-bounce-in" style="animation-delay: 0.2s;">
          <span v-if="activeSection === 'accueil'">🏠 Accueil</span>
          <span v-else-if="activeSection === 'depenses'">💸 Liste des dépenses</span>
          <span v-else-if="activeSection === 'revenus'">💰 Liste des revenus</span>
        </h1>

        <!-- Bloc solde - toujours visible -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-violet-500/30 mb-8 animate-scale-in backdrop-blur-sm" style="animation-delay: 0.3s;">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-slate-200 flex items-center gap-2">
              <span class="text-2xl animate-pulse">💳</span>
              Solde total
            </h2>
            <span class="text-4xl font-bold px-6 py-3 rounded-2xl shadow-2xl" 
                  :class="balance >= 0 
                    ? 'text-green-400 bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-500/30' 
                    : 'text-red-400 bg-gradient-to-r from-red-900/50 to-pink-900/50 border border-red-500/30'">
              {{ balance.toLocaleString() }} €
            </span>
          </div>

          <!-- Statistiques rapides -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-2xl border border-green-500/30 shadow-2xl backdrop-blur-sm">
              <div class="text-green-400 font-semibold text-sm">Total revenus</div>
              <div class="text-2xl font-bold text-green-300">
                +{{ totalRevenus.toLocaleString() }} €
              </div>
            </div>
            <div class="bg-gradient-to-br from-red-900/30 to-pink-900/30 p-6 rounded-2xl border border-red-500/30 shadow-2xl backdrop-blur-sm">
              <div class="text-red-400 font-semibold text-sm">Total dépenses</div>
              <div class="text-2xl font-bold text-red-300">
                -{{ totalDepenses.toLocaleString() }} €
              </div>
            </div>
          </div>

          <!-- Boutons -->
          <div class="flex gap-6">
            <button @click="openModal('revenu')"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 font-semibold shadow-2xl hover:shadow-green-500/25 flex items-center justify-center gap-2 transform hover:scale-105 hover:-translate-y-1">
              <span class="text-lg">💰</span>
              Ajouter revenu
            </button>
            <button @click="openModal('depense')"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 font-semibold shadow-2xl hover:shadow-red-500/25 flex items-center justify-center gap-2 transform hover:scale-105 hover:-translate-y-1">
              <span class="text-lg">💸</span>
              Ajouter dépense
            </button>
          </div>
        </div>

        <!-- Liste dynamique selon la section -->
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl border border-violet-500/30 animate-scale-in backdrop-blur-sm" style="animation-delay: 0.4s;">
          <h3 class="text-xl font-semibold mb-6 text-slate-200 flex items-center gap-2">
            <span v-if="activeSection === 'accueil'" class="text-xl">📊</span>
            <span v-else-if="activeSection === 'depenses'" class="text-xl">💸</span>
            <span v-else-if="activeSection === 'revenus'" class="text-xl">💰</span>
            
            <span v-if="activeSection === 'accueil'">Derniers mouvements</span>
            <span v-else-if="activeSection === 'depenses'">Toutes les dépenses ({{ depenses.length }})</span>
            <span v-else-if="activeSection === 'revenus'">Tous les revenus ({{ revenus.length }})</span>
          </h3>

          <div v-if="currentList.length === 0" class="text-center py-16 text-slate-400 animate-fade-in">
            <div class="text-8xl mb-6 animate-bounce">📝</div>
            <p class="text-xl">Aucune transaction pour le moment</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="(item, index) in currentList" :key="index"
                 class="flex justify-between items-center p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-102 animate-slide-in-up backdrop-blur-sm"
                 :class="item.type === 'revenu' 
                   ? 'border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20 hover:from-green-800/30 hover:to-emerald-800/30 hover:shadow-green-500/20' 
                   : 'border-red-500/30 bg-gradient-to-r from-red-900/20 to-pink-900/20 hover:from-red-800/30 hover:to-pink-800/30 hover:shadow-red-500/20'"
                 :style="{ 'animation-delay': (index * 0.1) + 's' }">
              
              <div class="flex items-center gap-4">
                <span class="text-3xl animate-pulse">{{ item.type === 'revenu' ? '💰' : '💸' }}</span>
                <div>
                  <div class="font-semibold text-white text-lg">{{ item.nom }}</div>
                  <div class="text-sm text-slate-400">
                    {{ new Date(item.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    }) }}
                  </div>
                </div>
              </div>
              
              <span class="text-xl font-bold px-4 py-2 rounded-xl shadow-xl"
                    :class="item.type === 'revenu' 
                      ? 'text-green-300 bg-gradient-to-r from-green-800/50 to-emerald-800/50 border border-green-500/30' 
                      : 'text-red-300 bg-gradient-to-r from-red-800/50 to-pink-800/50 border border-red-500/30'">
                {{ item.type === 'revenu' ? '+' : '-' }} {{ item.montant.toLocaleString() }} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal améliorée -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 z-50 animate-fade-in">
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-violet-500/30 animate-scale-in backdrop-blur-sm">
        <h2 class="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <span class="text-2xl animate-pulse">{{ modalType === 'revenu' ? '💰' : '💸' }}</span>
          Ajouter {{ modalType === 'revenu' ? 'un revenu' : 'une dépense' }}
        </h2>

        <form @submit.prevent="confirmTransaction" class="space-y-6">
          <div>
            <label class="block mb-2 font-semibold text-slate-200">Nom</label>
            <input v-model="form.nom"
                   type="text"
                   placeholder="Ex: Salaire, Courses..."
                   class="w-full border-2 border-violet-500/30 bg-slate-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all duration-300 shadow-lg backdrop-blur-sm placeholder-slate-400"
                   required />
          </div>

          <div>
            <label class="block mb-2 font-semibold text-slate-200">Montant (€)</label>
            <input v-model.number="form.montant"
                   type="number"
                   min="0.01"
                   step="0.01"
                   placeholder="0.00"
                   class="w-full border-2 border-violet-500/30 bg-slate-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-400 transition-all duration-300 shadow-lg backdrop-blur-sm placeholder-slate-400"
                   required />
          </div>

          <div class="flex gap-4 pt-4">
            <button type="button" @click="closeModal"
                    class="flex-1 px-6 py-3 bg-slate-600 text-slate-200 rounded-xl hover:bg-slate-500 transition-all duration-300 font-semibold shadow-xl transform hover:scale-105">
              Annuler
            </button>
            <button type="submit"
                    class="flex-1 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                    :class="modalType === 'revenu' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 hover:shadow-green-500/25' 
                      : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 hover:shadow-red-500/25'">
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const balance = ref(0)
const depenses = ref([])
const revenus = ref([])

const activeSection = ref('accueil')
const showModal = ref(false)
const modalType = ref(null)
const form = ref({ nom: '', montant: null })

// Charger transactions à la connexion
onMounted(async () => {
  const token = localStorage.getItem("token")
  try {
    const res = await axios.get("http://localhost:5000/api/transactions", {
      headers: { Authorization: `Bearer ${token}` }
    })
    const all = res.data
    revenus.value = all.filter(t => t.type === "revenu")
    depenses.value = all.filter(t => t.type === "depense")
    balance.value = revenus.value.reduce((s,r)=>s+r.montant,0) - depenses.value.reduce((s,d)=>s+d.montant,0)
  } catch (err) {
    console.error("Erreur chargement transactions", err)
  }
})

// Totaux
const totalRevenus = computed(() => revenus.value.reduce((s, r) => s + r.montant, 0))
const totalDepenses = computed(() => depenses.value.reduce((s, d) => s + d.montant, 0))

// Liste dynamique
const currentList = computed(() => {
  const all = [
    ...revenus.value.map(r => ({ ...r, type: 'revenu' })),
    ...depenses.value.map(d => ({ ...d, type: 'depense' }))
  ]
  return activeSection.value === 'accueil'
    ? all.sort((a, b) => b.date - a.date).slice(0, 10)
    : all.filter(t => t.type === activeSection.value).sort((a, b) => b.date - a.date)
})

function openModal(type) {
  modalType.value = type
  showModal.value = true
  form.value = { nom: '', montant: null }
}

function closeModal() {
  showModal.value = false
}

async function confirmTransaction() {
  console.log("confirmTransaction appelé !", form.value, modalType.value)

  if (!form.value.nom || !form.value.montant) {
    console.warn("Nom ou montant manquant")
    return
  }

  const token = localStorage.getItem("token")
  console.log("Token récupéré :", token)

  try {
    console.log("Envoi de la requête POST au backend...")
    const res = await axios.post(
      "http://localhost:5000/api/transactions",
      {
        nom: form.value.nom,
        montant: form.value.montant,
        type: modalType.value
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    console.log("Réponse reçue du backend :", res.data)

    const transaction = res.data

    if (transaction.type === "revenu") {
      console.log("Ajout revenu :", transaction)
      revenus.value.push(transaction)
      balance.value += transaction.montant
    } else {
      console.log("Ajout dépense :", transaction)
      depenses.value.push(transaction)
      balance.value -= transaction.montant
    }
  } catch (err) {
    console.error("Erreur ajout transaction", err)
  }

  console.log("Fermeture modal")
  closeModal()
}


function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = '/login'
}
</script>




<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-left {
  from { 
    opacity: 0;
    transform: translateX(-100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from { 
    opacity: 0;
    transform: translateX(100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-up {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounce-in {
  0% { 
    opacity: 0;
    transform: scale(0.3);
  }
  50% { 
    transform: scale(1.05);
  }
  70% { 
    transform: scale(0.9);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out;
}

.animate-slide-in-right {
  animation: slide-in-right 0.6s ease-out;
}

.animate-slide-in-up {
  animation: slide-in-up 0.5s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out;
}

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>

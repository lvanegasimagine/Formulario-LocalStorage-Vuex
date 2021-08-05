import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
  },
  mutations: {
    cargar(state, payload){
        state.tareas = payload;
    },
    set(state, payloadTarea){
      state.tareas.push(payloadTarea);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },
    eliminar(state, payloadId){
      // Filtra todo el arreglo que sea de diferente al id que se mando
      state.tareas = state.tareas.filter(item => item.id !== payloadId);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));

    },
    tarea(state, payloadId){
      if(!state.tareas.find(item => item.id === payloadId)){
        router.push('/');
        return ;
      }
      else{
        // Busca el elemento
        state.tarea = state.tareas.find(item => item.id === payloadId);
      }
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item);
      router.push('/');
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    }
  },
  actions: {
    cargarStorage({commit}){
      if(localStorage.getItem('tareas')){
        const tareas = JSON.parse(localStorage.getItem('tareas'));
        commit('cargar', tareas);
        return;
      }else{
        localStorage.setItem('tareas', JSON.stringify([]));
      }
    },
    setTareas({commit}, tarea){
      commit('set', tarea);
    },
    deleteTareas({commit}, id){
      commit('eliminar', id);
    },
    setTarea({commit}, id){
      commit('tarea', id);
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})

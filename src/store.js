// Code by Pendler - Team
// Angepasst von ChatGPT
// In store.js definieren wir den Vuex Store, der die zentrale Datenverwaltung für unsere Anwendung darstellt. Hier speichern wir den Benutzerstatus, die Benutzerdaten, die Profile und die Termine. Wir definieren auch die Aktionen, die aufgerufen werden, um Daten zu laden, hinzuzufügen, zu aktualisieren und zu löschen. Wir verwenden die Supabase-Client-Instanz, um mit der Datenbank zu interagieren.

import { createStore } from 'vuex';
import { supabase } from './supabaseClient';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    events: []  // Hier speichern wir alle Termine
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    setEvents(state, events) {
        state.events = events;
      },
    addEvent(state, event) {
      state.events.push(event);
    },
    updateEvent(state, updatedEvent) {
      state.events = state.events.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      );
    },
    deleteEvent(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId);
    }
  },
  actions: {
    async checkAuth({ commit }) {
      // Verwende getSession 
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Fehler beim Abrufen der Session:', error);
        commit('setUser', null);
      } else {
        commit('setUser', session?.user || null);
      }
    },
    async fetchProfile({ commit, state }) {
        if (!state.user) return;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', state.user.id)
          .single();
        if (error) {
          console.error('Fehler beim Abrufen des Profils:', error.message);
        } else {
          commit('setProfile', data);
        }
      },
      async updateProfile({ commit, state }, updatedProfile) {
        if (!state.user) return;
        // Option "returning: 'representation'" liefert die aktualisierten Daten
        const { data, error } = await supabase
          .from('profiles')
          .upsert([updatedProfile], { returning: 'representation' });
        if (error) {
          console.error('Fehler beim Aktualisieren des Profils:', error.message);
          throw error;
        } else if (data && data.length > 0) {
          commit('setUpdatedProfile', data[0]);
        }
      },
      async fetchEvents({ commit, state }) {
        if (!state.user) return; // Nur, wenn ein Benutzer eingeloggt ist
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', state.user.id);
        if (error) {
          console.error('Fehler beim Abrufen der Termine:', error);
        } else {
          commit('setEvents', data);
        }
      },
    
    async addEvent({ commit, state }, eventData) {
        if (!state.user) {
          console.error("Kein Benutzer eingeloggt");
          return;
        }
        // Füge die user_id hinzu
        eventData.user_id = state.user.id;
        const { data, error } = await supabase
          .from('events')
          .insert([eventData], { returning: 'representation' }); // Hinzufügen der Option
      
        if (error) {
          console.error('Fehler beim Hinzufügen des Termins:', error);
        } else if (data && data.length > 0) {
          // Da insert ein Array zurückgibt, nehmen wir das erste Element
          commit('addEvent', data[0]);
        } else {
          console.error("Keine Daten zurückgegeben.");
        }
      },
    async updateEvent({ commit }, eventData) {
      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', eventData.id);
      if (error) {
        console.error('Fehler beim Aktualisieren des Termins:', error);
      } else {
        commit('updateEvent', data[0]);
      }
    },
    async deleteEvent({ commit }, eventId) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);
      if (error) {
        console.error('Fehler beim Löschen des Termins:', error);
      } else {
        commit('deleteEvent', eventId);
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    profile: state => state.profile,
    events: state => state.events
  }
  
});

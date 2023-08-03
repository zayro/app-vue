<script setup>
import { onUnmounted, onMounted } from 'vue'

onMounted(() => {
  console.log(' ----------- onMounted -----------')
})

onUnmounted(() => {
  console.log(' ----------- onUnmounted -----------')
})
</script>

<template>
  <div class="about">
    <h1>Bienvenidos a nuestra página web de software de gestión administrativa.</h1>

    <p>
      En un mundo en constante cambio y evolución, la gestión de una empresa es una tarea cada vez más compleja. En
      respuesta a esta necesidad, creamos nuestro software de gestión administrativa, que ayuda a las empresas a
      optimizar sus operaciones, aumentar la productividad y maximizar su rentabilidad.
    </p>
    <p>
      Nuestro equipo está compuesto por profesionales altamente capacitados y experimentados en el desarrollo de
      software empresarial. Trabajamos en estrecha colaboración con nuestros clientes para entender sus necesidades y
      requisitos específicos, y luego desarrollamos soluciones personalizadas para satisfacer esas necesidades.
    </p>
    <p>
      Nos enorgullece ofrecer un software de gestión administrativa de vanguardia que es fácil de usar, flexible y
      escalable. Nuestro software es completamente personalizable y puede adaptarse a las necesidades únicas de
      cualquier negocio. Además, nuestro servicio al cliente es excepcional, y estamos siempre disponibles para brindar
      asistencia técnica y soporte a nuestros clientes.
    </p>
    <p>
      Nuestra misión es ayudar a las empresas a alcanzar su máximo potencial a través de la implementación de soluciones
      de software de gestión administrativa innovadoras y efectivas. Esperamos poder trabajar con su empresa para ayudar
      a mejorar su eficiencia, productividad y rentabilidad.
    </p>
    <p>
      Si desea obtener más información sobre nuestros servicios y soluciones de software de gestión administrativa, no
      dude en ponerse en contacto con nosotros. Estamos aquí para ayudarlo a alcanzar el éxito empresarial.
    </p>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>

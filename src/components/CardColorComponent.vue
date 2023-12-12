<script setup></script>
<template>
  <div class="card card-color">
    <div class="card-body">
      <div class="card-title"><v-icon name="md-apartment" fill="#3C8D98" scale="4" /> Reporte por Apartamento</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a,
a:hover,
a:visited,
a:active {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}

$color1: rgb(60, 141, 152, 50%);

$card-width: 450px;
$card-height: 170px;

.card-color {
  width: $card-width;
  height: $card-height;
  cursor: pointer;
  align-items: center;
  border: 6px solid transparent;
  transition: border-color 0.4s ease-in-out;

  &:hover {
    border-color: $color1;

    .card-subtitle {
      font-weight: 400;
    }
  }
}
</style>

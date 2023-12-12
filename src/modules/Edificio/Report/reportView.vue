<template>
  <div>
    <div class="flex-container">
      <RouterLink to="/main/reportApt">
        <div class="card card1">
          <div class="card-body">
            <div class="card-title">
              <v-icon name="md-apartment" fill="#3C8D98" scale="4" /> Reporte por Apartamento
            </div>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/main/reportPayment">
        <div class="card card2">
          <div class="card-body">
            <div class="card-title"><v-icon name="gi-receive-money" fill="#3C9844" scale="4" /> Reporde de Pagos</div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="flex-container">
      <RouterLink to="/main/reportExpenditure">
        <div class="card card3">
          <div class="card-body">
            <div class="card-title"><v-icon name="gi-pay-money" fill="#987E3C" scale="4" /> Reporde de Gastos</div>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/main/reportBalance">
        <div class="card card4">
          <div class="card-body">
            <div class="card-title"><v-icon name="fa-balance-scale" fill="#983C3C" scale="4" /> Balance Actual</div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="flex-container">
      <RouterLink to="/main/reportGeneral">
        <div class="card card5">
          <div class="card-body">
            <div class="card-title"><v-icon name="io-document-text" fill="#56983c" scale="4" /> Reporde Detallado</div>
          </div>
        </div>
      </RouterLink>
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
.flex-container {
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;

  transition: margin-left 0.5s;
  padding: 16px;
  /* height: 98vh; */
}

$color1: rgb(60, 141, 152, 50%);
$color2: rgb(60, 152, 68, 50%);
$color3: rgb(152, 126, 60, 50%);
$color4: rgb(152, 60, 60, 50%);
$color5: rgba(86, 152, 60, 0.5);
$card-width: 450px;
$card-height: 170px;

@mixin card-border-color($valor) {
  @if $valor == 1 {
    border-color: $color1;
  } @else if $valor == 2 {
    border-color: $color2;
  } @else if $valor == 3 {
    border-color: $color3;
  } @else if $valor == 4 {
    border-color: $color4;
  } @else if $valor == 5 {
    border-color: $color5;
  } @else {
    border-color: black;
  }
}

@for $i from 1 through 5 {
  .card#{$i} {
    width: $card-width;
    height: $card-height;
    cursor: pointer;
    align-items: center;
    border: 6px solid transparent;
    transition: border-color 0.4s ease-in-out;

    &:hover {
      // border-color:  if($i == 1, $color1, if($i == $color2, 16px, if($i == $color3)));
      @include card-border-color($i);

      .card-subtitle {
        font-weight: 400;
      }
    }
  }
}
</style>

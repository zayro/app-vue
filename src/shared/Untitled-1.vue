<template>
    <nav class="navbar navbar-expand-lg fixed-top bg-custom">
      <div class="container">

        <a
        v-if="width > 1024"
        href="javascript:void(0);"
        class="icon-left"
        @click="emit('open-sidebar')"
      >
        <v-icon name="hi-menu" v-bind:fill="colorNavText" scale="1.3" />
      </a>


        <v-icon
          name="hi-menu"
          v-bind:fill="colorNavText"
          scale="1.3"
          @click="emit('open-sidebar')"
        />
        <a class="navbar-brand" href="#"> </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"> Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>

          <span class="navbar-text pe-4">
            <v-icon
              name="fa-expand"
              v-bind:fill="colorNavText"
              scale="1.3"
              @click="openNav"
            />
          </span>
          <span class="navbar-text">
            <v-icon
              name="ri-shut-down-line"
              v-bind:fill="colorNavText"
              scale="1.3"
              @click="openNav"
            />
          </span>
        </div>
      </div>
    </nav>
  </template>

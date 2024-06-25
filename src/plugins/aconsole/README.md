## html

<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<style>
    .vc-switch {
      right: 0px;
      bottom: calc(env(safe-area-inset-bottom) + 1.2rem) !important;
    }
</style>

## global.ts

if ((window as any).VConsole) new (window as any).VConsole({});

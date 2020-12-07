require("jsdom-global")(undefined, { url: "https://localhost" });

global.window._env_ = { LOG: null };
global.window._env_.LOG = {
  ENV: "local",
  LOG: false,
};
global.localStorage = window.localStorage;

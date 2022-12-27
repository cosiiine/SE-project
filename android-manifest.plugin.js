const { withAndroidManifest } = require("@expo/config-plugins")

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest

    // add the tools to apply permission remove
    androidManifest.$ = {
      ...androidManifest.$,
      "android:resizeableActivity":"false",
      // "xmlns:tools": "http://schemas.android.com/tools",
    }

    // add remove property to the audio record permission
    // androidManifest["uses-permission"] = androidManifest["uses-permission"].map(
    //   perm => {
    //     if (perm.$["android:name"] === "android.permission.RECORD_AUDIO") {
    //       perm.$["tools:node"] = "remove"
    //     }
    //     return perm
    //   }
    // )

    return config
  })
}
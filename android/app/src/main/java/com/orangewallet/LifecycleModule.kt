package com.orangewallet

import android.app.Activity
import android.app.Application
import android.os.Bundle
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.modules.core.DeviceEventManagerModule

class LifecycleModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), Application.ActivityLifecycleCallbacks {

    private val reactContext: ReactApplicationContext = reactContext

    init {
        val app = reactContext.applicationContext as Application
        app.registerActivityLifecycleCallbacks(this) // ✅ Register lifecycle callbacks
    }

    override fun getName(): String {
        return "LifecycleModule"
    }

    private fun sendEvent(eventName: String) {
        Log.d("LifecycleModule", "Event triggered: $eventName") // Debugging log
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, null)
    }

    override fun onActivityDestroyed(activity: Activity) {
        sendEvent("onDestroy")
    }

    override fun onActivityResumed(activity: Activity) {
        sendEvent("onResume")
    }

    override fun onActivityPaused(activity: Activity) {
        sendEvent("onPause")
    }

    override fun onActivityStarted(activity: Activity) {}
    override fun onActivityStopped(activity: Activity) {}
    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
    override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}
}

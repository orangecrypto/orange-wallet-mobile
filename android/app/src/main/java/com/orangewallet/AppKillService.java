package com.orangewallet;


import android.content.Intent;
import android.os.IBinder;
import com.facebook.react.HeadlessJsTaskService;

public class AppKillService extends HeadlessJsTaskService {
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Intent service = new Intent(getApplicationContext(), AppKillService.class);
        startService(service);
        HeadlessJsTaskService.acquireWakeLockNow(getApplicationContext());
    }
}

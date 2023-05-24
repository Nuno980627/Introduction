# AndroidManifest 清单文件
最近开始研究Android，记录一些初学Android的经验

## 启动项与意图过滤器（intent-filter）
### 启动项
通过intent-filter来配置
```XML
    <intent-filter>
     <!--启动项必须配置项-->
     <action android:name="android.intent.action.MAIN" /> 
     <!--启动项必须配置项-->
     <category android:name="android.intent.category.LAUNCHER" />
     <!--允许开启多窗口应用-->
     <category android:name="android.intent.category.MULTIWINDOW_LAUNCHER" />
    </intent-filter>
```

### 隐式意图接收器

捕获其他应用发起的隐式意图
```XML
     <intent-filter>
         <action android:name="android.intent.action.VIEW" />
         <category android:name="android.intent.category.DEFAULT" />
         <category android:name="android.intent.category.BROWSABLE" />
     </intent-filter>
```
### 完整实例

```XML
       <activity
            android:name=".WelcomeActivity"
            android:configChanges="keyboardHidden|orientation"
            android:exported="true"
            android:hardwareAccelerated="true"
            android:launchMode="singleTask"
            android:screenOrientation="portrait"
            android:theme="@style/WelcomeEntranceActionBarTheme"
            android:windowSoftInputMode="adjustPan">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="android.intent.category.MULTIWINDOW_LAUNCHER" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

            </intent-filter>


        </activity>
```
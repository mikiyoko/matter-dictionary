// =====================================================
// clusters.js — Matter 1.5 クラスターデータ
// 更新方法：新しいクラスターをこの配列に追加するだけ
// 最終更新：Matter 1.5
// =====================================================

var CLUSTERS = [
  { id:"on-off", clusterId:"0x0006", name:"On/Off", nameJa:"オン/オフ", description:"デバイスのON・OFFを制御する最も基本のクラスター",
    features:["Lighting（照明向け点灯効果）","DeadFrontBehavior（運転中パネル無効）","OffOnly（オフのみ受付）"],
    keyAttributes:[{name:"OnOff",description:"現在のオン/オフ状態"},{name:"StartUpOnOff",description:"再起動時の挙動（Off/On/Toggle/null=前回保持）"}],
    keyCommands:[{name:"On",description:"オンにする"},{name:"Off",description:"オフにする"},{name:"Toggle",description:"現在の状態を反転"},{name:"OnWithTimedOff",description:"指定時間後に自動でオフ"}]
  },
  { id:"level-control", clusterId:"0x0008", name:"Level Control", nameJa:"レベルコントロール", description:"明るさ・速度・音量など段階的な値を制御。レベル範囲は1〜254",
    features:["OnOff連動","Lighting（調光カーブ）"],
    keyAttributes:[{name:"CurrentLevel",description:"現在のレベル（1〜254）"},{name:"MinLevel/MaxLevel",description:"レベルの上下限"}],
    keyCommands:[{name:"MoveToLevel",description:"指定レベルに移動"},{name:"Move",description:"連続的に上げ下げ"},{name:"Step",description:"ステップ変化"},{name:"Stop",description:"変化を止める"}]
  },
  { id:"color-control", clusterId:"0x0300", name:"Color Control", nameJa:"カラーコントロール", description:"照明の色（HSV・色温度・XY）を制御。サーカディアン照明の核心",
    features:["HueSaturation（色相・彩度）","ColorTemperature（色温度モード 2700K〜6500K）","XY（CIE1931色空間）"],
    keyAttributes:[{name:"ColorTemperatureMireds",description:"現在の色温度（ミレッド値。大=暖色、小=寒色）"},{name:"CurrentHue",description:"現在の色相（0〜254）"},{name:"CurrentSaturation",description:"現在の彩度（0〜254）"}],
    keyCommands:[{name:"MoveToColorTemperature",description:"指定の色温度に移動"},{name:"MoveColorTemperature",description:"色温度を連続変化"},{name:"MoveToHueAndSaturation",description:"色相と彩度を指定"},{name:"ColorLoopSet",description:"カラーループ（自動色変化）"}]
  },
  { id:"scenes-management", clusterId:"0x0062", name:"Scenes Management", nameJa:"シーン管理", description:"複数の機器設定をシーンとして保存・呼び出す。映画モード・就寝モードを一発切り替え",
    features:["SceneNames（シーン名をつける）"],
    keyAttributes:[{name:"CurrentScene",description:"現在のシーン番号"},{name:"SceneCount",description:"登録済みシーン数"}],
    keyCommands:[{name:"AddScene",description:"現在の状態をシーンとして保存"},{name:"RecallScene",description:"シーンを呼び出して適用"},{name:"StoreScene",description:"既存シーンを上書き保存"}]
  },
  { id:"identify", clusterId:"0x0003", name:"Identify", nameJa:"識別", description:"デバイスをLED点滅や音で識別モードにする。どれがその機器か確認するときに使う",
    features:[],
    keyAttributes:[{name:"IdentifyTime",description:"識別モードの残り時間（秒）"},{name:"IdentifyType",description:"識別方法（視覚・音声・振動など）"}],
    keyCommands:[{name:"Identify",description:"指定秒数だけ識別モード開始"},{name:"TriggerEffect",description:"特定エフェクトを一時実行"}]
  },
  { id:"groups", clusterId:"0x0004", name:"Groups", nameJa:"グループ管理", description:"エンドポイントをグループに所属させる。全照明を同時操作などのグループ制御を実現",
    features:["GroupNames（グループに名前をつける）"],
    keyAttributes:[{name:"NameSupport",description:"グループ名のサポート状況"}],
    keyCommands:[{name:"AddGroup",description:"グループに追加"},{name:"RemoveGroup",description:"グループから削除"},{name:"AddGroupIfIdentifying",description:"識別中のデバイスをグループ追加"}]
  },
  { id:"boolean-state", clusterId:"0x0045", name:"Boolean State", nameJa:"ブール値状態", description:"True/Falseの二値状態を管理する汎用クラスター。開閉センサーなどに使用",
    features:[],
    keyAttributes:[{name:"StateValue",description:"現在の状態（true=開/検知あり、false=閉/なし）"}],
    keyCommands:[]
  },
  { id:"operational-state", clusterId:"0x0060", name:"Operational State", nameJa:"動作状態", description:"家電・ロボットの動作状態（動作中・停止・エラー）を管理する汎用クラスター",
    features:[],
    keyAttributes:[{name:"CurrentPhase",description:"現在の動作フェーズ（すすぎ中など）"},{name:"CountdownTime",description:"残り時間カウントダウン（秒）"}],
    keyCommands:[{name:"Pause",description:"一時停止"},{name:"Stop",description:"停止"},{name:"Start",description:"開始/再開"},{name:"Resume",description:"一時停止から再開"}]
  },
  { id:"temperature-measurement", clusterId:"0x0402", name:"Temperature Measurement", nameJa:"温度計測", description:"現在の温度を計測して報告。単位は°C×100の整数（25℃=2500）",
    features:[],
    keyAttributes:[{name:"MeasuredValue",description:"現在の温度（°C×100）"},{name:"MinMeasuredValue/MaxMeasuredValue",description:"測定範囲"}],
    keyCommands:[]
  },
  { id:"humidity-measurement", clusterId:"0x0405", name:"Relative Humidity Measurement", nameJa:"湿度計測", description:"相対湿度を計測して報告。単位は%×100の整数（50%=5000）",
    features:[],
    keyAttributes:[{name:"MeasuredValue",description:"現在の相対湿度（%×100）"}],
    keyCommands:[]
  },
  { id:"occupancy-sensing", clusterId:"0x0406", name:"Occupancy Sensing", nameJa:"在室検知（人感）", description:"人・物体の存在を検知するクラスター。照明の自動ON/OFFや空調の在室制御に活用",
    features:[],
    keyAttributes:[{name:"Occupancy",description:"在室状態（在室=1、不在=0）"},{name:"OccupancySensorType",description:"センサー種類（PIR赤外線/超音波/複合型）"},{name:"PIROccupiedToUnoccupiedDelay",description:"在室→不在と判断するまでの遅延時間（秒）"}],
    keyCommands:[]
  },
  { id:"illuminance-measurement", clusterId:"0x0400", name:"Illuminance Measurement", nameJa:"照度計測", description:"周囲の明るさを計測。自動調光・カーテン開閉の制御に活用",
    features:[],
    keyAttributes:[{name:"MeasuredValue",description:"現在の照度"},{name:"LightSensorType",description:"センサーの種類"}],
    keyCommands:[]
  },
  { id:"smoke-co-alarm", clusterId:"0x005C", name:"Smoke CO Alarm", nameJa:"煙・CO警報", description:"煙と一酸化炭素（CO）を検知して警報。バッテリー警告・耐用年数通知も含む",
    features:["SMOKE（煙検知）","CO（CO検知）"],
    keyAttributes:[{name:"SmokeState",description:"煙の警報状態（Normal/Warning/Critical）"},{name:"COState",description:"COの警報状態"},{name:"BatteryAlert",description:"バッテリー残量警告"},{name:"EndOfServiceAlert",description:"耐用年数終了アラート"}],
    keyCommands:[{name:"SelfTestRequest",description:"セルフテストを要求"}]
  },
  { id:"air-quality", clusterId:"0x005B", name:"Air Quality", nameJa:"空気質（総合評価）", description:"室内空気質の総合評価。7段階（Good→ExtremelyPoor）で報告するクラスター",
    features:["Fair","Moderate","VeryPoor","ExtremelyPoor"],
    keyAttributes:[{name:"AirQuality",description:"現在の空気質評価（7段階）"}],
    keyCommands:[]
  },
  { id:"thermostat", clusterId:"0x0201", name:"Thermostat", nameJa:"サーモスタット", description:"温度制御の司令塔。エアコン・床暖房・換気の統合制御。在室/不在の温度設定切り替えも対応",
    features:["Occupancy（在室連動）","Setback（省エネセットバック）","AutoMode（自動モード）"],
    keyAttributes:[{name:"LocalTemperature",description:"現在の室温（°C×100）"},{name:"OccupiedCoolingSetpoint",description:"在室時の冷房設定温度"},{name:"OccupiedHeatingSetpoint",description:"在室時の暖房設定温度"},{name:"SystemMode",description:"動作モード（オフ・自動・冷房・暖房等）"}],
    keyCommands:[{name:"SetpointRaiseLower",description:"設定温度を相対的に上げ下げ"}]
  },
  { id:"fan-control", clusterId:"0x0202", name:"Fan Control", nameJa:"ファンコントロール", description:"ファンの速度・方向・動作モードを制御。シーリングファンや空気清浄機のファンに使用",
    features:["MultiSpeed（多段階速度）","Auto（自動速度）","Rocking（首振り）","Wind（自然風モード）","AirflowDirection（気流方向）"],
    keyAttributes:[{name:"FanMode",description:"現在のファンモード（オフ・低・中・高・自動等）"},{name:"PercentSetting",description:"ファン速度の設定値（%）"}],
    keyCommands:[{name:"Step",description:"ファン速度をステップ変化"}]
  },
  { id:"door-lock", clusterId:"0x0101", name:"Door Lock", nameJa:"ドアロック", description:"スマートロックの中核クラスター。PIN・指紋・顔認証・Aliroデジタルキーなどマルチモーダル対応",
    features:["PIN（暗証番号）","RID（リモート識別）","FGP（指紋認証）","FACE（顔認証）","ALIRO（デジタルキー）","RFID（ICカード）"],
    keyAttributes:[{name:"LockState",description:"現在の状態（未施錠・施錠済・施錠中・解錠中）"},{name:"AutoRelockTime",description:"自動施錠までの時間（秒）"}],
    keyCommands:[{name:"LockDoor",description:"施錠する"},{name:"UnlockDoor",description:"解錠する"},{name:"UnlockWithTimeout",description:"指定時間後に自動施錠して解錠"},{name:"SetCredential",description:"PIN等の認証情報を登録"}]
  },
  { id:"window-covering", clusterId:"0x0102", name:"Window Covering", nameJa:"電動ブラインド制御", description:"電動ブラインド・ロールスクリーン・電動カーテンを制御。上下移動とチルト角度に対応",
    features:["Lift（上下移動）","Tilt（角度調整）","PositionAwareLift（位置把握）","AbsolutePosition（絶対位置制御）"],
    keyAttributes:[{name:"CurrentPositionLiftPercentage",description:"現在の開閉率（%）"},{name:"CurrentPositionTilt",description:"現在のチルト角"}],
    keyCommands:[{name:"UpOrOpen",description:"完全に開く"},{name:"DownOrClose",description:"完全に閉じる"},{name:"Stop",description:"動作を止める"},{name:"GoToLiftPercentage",description:"指定の開閉率に移動"}]
  },
  { id:"closure-control", clusterId:"0x0105", name:"Closure Control", nameJa:"クロージャー制御（新世代）", description:"v1.5新規。窓・ドア・ゲート・キャビネットなど複雑な開閉機構に対応した次世代クラスター",
    features:["Positioning（位置精度制御）","Latching（ラッチ機構）","SpeedControl（速度制御）","VentilationMode（換気モード）"],
    keyAttributes:[{name:"MainState",description:"メインの開閉状態（開・閉・動作中・一時停止等）"},{name:"CountdownTime",description:"自動閉鎖までのカウントダウン"}],
    keyCommands:[{name:"Stop",description:"動作を止める"},{name:"MoveTo",description:"指定位置に移動"},{name:"Calibrate",description:"キャリブレーションを実行"}]
  },
  { id:"device-energy-management", clusterId:"0x0098", name:"Device Energy Management", nameJa:"デバイスエネルギー管理", description:"スマートホームのエネルギー最適化の要。太陽光の余剰電力で家電を動かすスマート制御を実現",
    features:["PowerAdjustment（電力調整）","StartTimeAdjustment（開始時刻調整）","Pausable（一時停止）","ConstraintBasedAdjustment（制約ベース調整）"],
    keyAttributes:[{name:"ESAType",description:"エネルギー管理の種類（EV充電器・給湯器・家電等）"},{name:"AbsMinPower/AbsMaxPower",description:"電力の絶対最小・最大値"}],
    keyCommands:[{name:"PowerAdjustRequest",description:"電力消費量を調整する要求"},{name:"StartTimeAdjustRequest",description:"動作開始時刻を変更する要求"}]
  },
  { id:"energy-evse", clusterId:"0x0099", name:"Energy EVSE", nameJa:"EV充電器制御", description:"EV充電器の制御クラスター。スマートチャージ（太陽光余剰電力での充電等）に対応",
    features:["ChargingPreferences（充電設定）","SoCReporting（バッテリー残量報告）","PlugAndCharge（自動認証充電）"],
    keyAttributes:[{name:"State",description:"充電器の状態（未接続・接続・充電中・充電完了等）"},{name:"MinimumChargeCurrent/MaximumChargeCurrent",description:"充電電流の範囲設定"}],
    keyCommands:[{name:"EnableCharging",description:"充電を許可"},{name:"DisableCharging",description:"充電を停止する"}]
  },
  { id:"camera-av-stream", clusterId:"0x0551", name:"Camera AV Stream Management", nameJa:"カメラ映像・音声管理", description:"カメラの映像・音声・スナップショットのストリーム管理。解像度・暗視設定などを制御",
    features:["PrivacyMode（プライバシーモード）","NightVision（暗視）","WatermarkImage（透かし）"],
    keyAttributes:[{name:"MaxConcurrentVideoEncoders",description:"同時エンコード可能なストリーム数"},{name:"NightVisionUsesInfrared",description:"赤外線暗視カメラかどうか"}],
    keyCommands:[{name:"AllocateVideoStream",description:"映像ストリームを確保"},{name:"AllocateAudioStream",description:"音声ストリームを確保"}]
  },
  { id:"webrtc-transport", clusterId:"0x0553", name:"WebRTC Transport Provider", nameJa:"WebRTC映像配信", description:"カメラ側のWebRTC通信を管理するクラスター。リアルタイム映像配信の確立を担当",
    features:[],
    keyAttributes:[{name:"CurrentSessions",description:"現在アクティブなWebRTCセッションのリスト"}],
    keyCommands:[{name:"SolicitOffer",description:"WebRTCセッションのオファーを要求"},{name:"EndSession",description:"セッションを終了する"}]
  },
  { id:"media-playback", clusterId:"0x0509", name:"Media Playback", nameJa:"メディア再生", description:"動画・音楽の再生・停止・早送りなどを制御するクラスター",
    features:["AdvancedSeek（高精度シーク）","VariableSpeed（可変速度再生）"],
    keyAttributes:[{name:"CurrentState",description:"再生状態（再生中・停止・一時停止等）"},{name:"PlaybackSpeed",description:"再生速度（1.0=標準）"}],
    keyCommands:[{name:"Play/Pause/Stop",description:"基本の再生コントロール"},{name:"FastForward/Rewind",description:"早送り・巻き戻し"},{name:"Seek",description:"指定位置へジャンプ"}]
  },
  { id:"rvc-operational-state", clusterId:"0x0061", name:"RVC Operational State", nameJa:"ロボット掃除機動作状態", description:"ロボット掃除機専用の動作状態クラスター。充電・ドッキングなど掃除機特有の状態を管理",
    features:[],
    keyAttributes:[{name:"OperationalState",description:"現在の状態（SeekingCharger・Charging・Docked等）"},{name:"OperationalError",description:"現在のエラー状態"}],
    keyCommands:[{name:"Pause/Resume",description:"一時停止・再開"},{name:"GoHome",description:"充電ドックに戻る"}]
  },
  { id:"laundry-washer-mode", clusterId:"0x0051", name:"Laundry Washer Mode", nameJa:"洗濯機モード", description:"洗濯機の動作モードを管理するクラスター。洗濯機専用モードを定義",
    features:[],
    keyAttributes:[{name:"SupportedModes",description:"対応する洗濯モード一覧"},{name:"CurrentMode",description:"現在選択されているモード"}],
    keyCommands:[{name:"ChangeToMode",description:"指定モードに変更"}]
  },
  { id:"ballast-configuration", clusterId:"0x0301", name:"Ballast Configuration", nameJa:"バラスト設定", description:"照明バラスト（安定器）の詳細設定クラスター。調光の最小・最大値を細かく設定",
    features:[],
    keyAttributes:[{name:"MinLevel/MaxLevel",description:"バラストが動作するレベルの上下限"},{name:"PowerOnLevel",description:"電源投入時のレベル"}],
    keyCommands:[]
  }
];

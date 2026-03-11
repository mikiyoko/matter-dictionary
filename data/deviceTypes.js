// =====================================================
// deviceTypes.js — Matter 1.5 デバイスタイプデータ
// 更新方法：新しいデバイスタイプをこの配列に追加するだけ
// 最終更新：Matter 1.5
// =====================================================

var DEVICE_TYPES = [
  // ===== 照明 =====
  { id:"on-off-light", deviceTypeId:"0x0100", name:"On/Off Light", nameJa:"オン/オフ照明", category:"lighting", icon:"💡",
    description:"ON/OFFのみ対応するシンプルな照明。明るさ調整・色変更は不可",
    req:["identify","groups","on-off"], opt:["scenes-management","level-control"],
    tags:["照明","シンプル","スイッチ"],
    notes:"最もシンプルな照明タイプ。スマートスイッチで既存照明をオン/オフするだけなら十分。Level Controlを搭載しても実際の調光はできません。"
  },
  { id:"dimmable-light", deviceTypeId:"0x0101", name:"Dimmable Light", nameJa:"調光対応照明", category:"lighting", icon:"🔆",
    description:"明るさを段階的に調整できる照明。オン/オフ照明のスーパーセット",
    supersetOf:["on-off-light"], req:["identify","groups","on-off","level-control"], opt:["scenes-management","ballast-configuration"],
    tags:["照明","調光","明るさ","ディマー"],
    notes:"Level Controlクラスターが必須。MinLevel=1、MaxLevel=254が固定値。調光カーブは対数曲線推奨（人の目の特性に合わせるため）。"
  },
  { id:"color-temperature-light", deviceTypeId:"0x010C", name:"Color Temperature Light", nameJa:"色温度調整照明", category:"lighting", icon:"🌅",
    description:"電球色〜昼光色の色温度を変えられる照明。サーカディアン照明の実現に最適",
    supersetOf:["dimmable-light"], req:["identify","groups","on-off","level-control","color-control"], opt:["scenes-management","ballast-configuration"],
    tags:["照明","色温度","サーカディアン","健康","睡眠","2700K","6500K","電球色","昼光色"],
    notes:"Color Controlクラスターの色温度モード（CT）が必須。2700K（電球色・就寝前）から6500K（昼光色・朝の目覚め）を自動制御することで体内時計に合わせた照明環境が作れます。Apple Homeの「適応照明」機能はこの仕様に基づいています。"
  },
  { id:"extended-color-light", deviceTypeId:"0x010D", name:"Extended Color Light", nameJa:"フルカラー照明", category:"lighting", icon:"🌈",
    description:"RGB・HSVなどフルカラー対応の照明。色温度調整も含む最上位照明タイプ",
    supersetOf:["color-temperature-light"], req:["identify","groups","on-off","level-control","color-control"], opt:["scenes-management","ballast-configuration"],
    tags:["照明","フルカラー","RGB","HSV","色温度","サーカディアン","アンビエント"],
    notes:"Color ControlクラスターのHueSaturationモードも必須。色温度調整照明の全機能に加え、任意の色（赤・緑・青など）も表現可能。ゲーミング・パーティー演出・シアタールームなどに活用。"
  },

  // ===== スマートプラグ =====
  { id:"on-off-plugin", deviceTypeId:"0x010A", name:"On/Off Plug-in Unit", nameJa:"スマートプラグ（差し込み型）", category:"plug", icon:"🔌",
    description:"コンセントに差し込むタイプのスマートプラグ。接続した家電のON/OFFをリモート制御",
    req:["identify","groups","on-off"], opt:["scenes-management","level-control"],
    tags:["プラグ","コンセント","スマートプラグ","電源管理"],
    notes:"Meross・TP-Link Tapo等のスマートプラグに対応するタイプ。差し込むだけで既存の家電をスマート化できます。"
  },
  { id:"mounted-on-off", deviceTypeId:"0x010F", name:"Mounted On/Off Control", nameJa:"壁付けスマートスイッチ", category:"plug", icon:"🔲",
    description:"壁に固定設置するタイプのスマートスイッチ（Matter 1.4〜）。既存の壁スイッチを置き換える",
    req:["identify","on-off"], opt:["scenes-management","level-control"],
    tags:["壁スイッチ","固定設置","スマートスイッチ"],
    notes:"Matter 1.4以前の壁付けスイッチはOn/Off Plug-in Unitとして登録されていた。v1.4以降はこのタイプが推奨。工事が必要になる場合があります。"
  },
  { id:"water-valve", deviceTypeId:"0x0042", name:"Water Valve", nameJa:"止水バルブ", category:"plug", icon:"🚰",
    description:"水の流れをリモートでON/OFFできるスマートバルブ。水漏れ検知との連携で自動止水が可能",
    req:["identify","on-off"], opt:["boolean-state"],
    tags:["水","バルブ","漏水","止水","散水"],
    notes:"水漏れ検知センサーと組み合わせることで、漏水を検知したら自動的に水を止めるシステムが作れます。"
  },

  // ===== スイッチ =====
  { id:"on-off-switch", deviceTypeId:"0x0103", name:"On/Off Light Switch", nameJa:"照明スイッチ（オン/オフ）", category:"switch", icon:"🎚",
    description:"照明のON/OFFを操作するスイッチ。「制御する側」のデバイスタイプ",
    req:["identify","on-off"], opt:["groups"],
    tags:["スイッチ","コントローラー","照明"],
    notes:"このデバイスは「制御する側」。バインディング（Binding）で照明デバイスと紐付けます。"
  },
  { id:"dimmer-switch", deviceTypeId:"0x0104", name:"Dimmer Switch", nameJa:"調光スイッチ", category:"switch", icon:"🎛",
    description:"照明の明るさを調整する調光スイッチ。照明スイッチのスーパーセット",
    supersetOf:["on-off-switch"], req:["identify","on-off","level-control"], opt:["groups"],
    tags:["スイッチ","調光","コントローラー"],
    notes:null
  },
  { id:"generic-switch", deviceTypeId:"0x000F", name:"Generic Switch", nameJa:"汎用スイッチ（スマートボタン）", category:"switch", icon:"⚪",
    description:"何をコントロールするかを縛らない汎用ボタン/スイッチ。シーン切り替えボタンに広く使われる",
    req:["identify"], opt:["groups"],
    tags:["スイッチ","ボタン","シーン","汎用","スマートボタン"],
    notes:"ラッチ型（トグル）とモーメンタリ型（押している間だけ）の両方に対応。Aqara Button・IKEA Tradfri Remoteなどがこのタイプ。オートメーションのトリガーとして使われることが多い。"
  },

  // ===== センサー =====
  { id:"contact-sensor", deviceTypeId:"0x0015", name:"Contact Sensor", nameJa:"開閉センサー", category:"sensor", icon:"🔎",
    description:"ドア・窓の開閉を検知するセンサー。帰宅通知・防犯・換気状態管理に活用",
    req:["identify","boolean-state"], opt:[],
    tags:["センサー","開閉","ドア","窓","帰宅通知","防犯"],
    notes:"Boolean StateクラスターでTrue（開）/False（閉）を報告。バッテリー駆動でICD（間欠接続デバイス）として動作することが多い。"
  },
  { id:"occupancy-sensor", deviceTypeId:"0x0107", name:"Occupancy Sensor", nameJa:"人感センサー（在室検知）", category:"sensor", icon:"🚶",
    description:"人・物体の存在を検知するセンサー。照明の自動ON/OFFや空調の在室制御に活用",
    req:["identify","occupancy-sensing"], opt:[],
    tags:["センサー","人感","在室","自動照明","省エネ"],
    notes:"Occupancy Sensingクラスターで在室（1）/不在（0）を報告。PIR（赤外線）方式が一般的。照明の消し忘れ防止や不在時の空調を止める自動化に活用。"
  },
  { id:"temperature-sensor", deviceTypeId:"0x0302", name:"Temperature Sensor", nameJa:"温度センサー", category:"sensor", icon:"🌡",
    description:"室内・屋外の温度を計測するセンサー。熱中症アラートやエアコン自動制御に活用",
    req:["identify","temperature-measurement"], opt:[],
    tags:["センサー","温度","熱中症","エアコン"],
    notes:"温度計測クラスターで°C×100の整数として報告（25℃=2500）。サーモスタットと組み合わせて精密な空調制御が可能。"
  },
  { id:"humidity-sensor", deviceTypeId:"0x0307", name:"Humidity Sensor", nameJa:"湿度センサー", category:"sensor", icon:"💧",
    description:"室内の相対湿度を計測するセンサー。カビ・乾燥対策や加湿器の自動制御に活用",
    req:["identify","humidity-measurement"], opt:[],
    tags:["センサー","湿度","カビ","乾燥","加湿器"],
    notes:"湿度センサーだけでなく温度センサーを内蔵する製品が多い（例：Aqara TH Sensor）。加湿器のON/OFFトリガーとして使える。"
  },
  { id:"light-sensor", deviceTypeId:"0x0106", name:"Light Sensor", nameJa:"照度センサー", category:"sensor", icon:"☀️",
    description:"周囲の照度（明るさ）を計測するセンサー。日没検知・自動カーテン・照明の自動調整に活用",
    req:["identify","illuminance-measurement"], opt:[],
    tags:["センサー","照度","明るさ","日没","カーテン","自動照明"],
    notes:"外が暗くなったらカーテンを閉める、夕方になったら玄関灯を点けるなどの自動化トリガーとして活用。"
  },
  { id:"smoke-co-alarm-dev", deviceTypeId:"0x0076", name:"Smoke CO Alarm", nameJa:"煙・CO警報器", category:"sensor", icon:"🚨",
    description:"煙と一酸化炭素（CO）を検知する警報器。バッテリー低下・耐用年数通知も含む",
    req:["identify","smoke-co-alarm"], opt:["temperature-measurement","humidity-measurement"],
    tags:["センサー","煙","CO","一酸化炭素","火災","安全"],
    notes:"セルフテスト機能・バッテリー警告・耐用年数終了通知がスマートフォンに届く。Matter 1.5では煙検知→窓を自動で開けるなどの連携オートメーションも可能。"
  },
  { id:"air-quality-sensor", deviceTypeId:"0x002C", name:"Air Quality Sensor", nameJa:"空気質センサー", category:"sensor", icon:"🌿",
    description:"PM2.5・VOC・CO₂などを含む室内空気質を総合評価するセンサー。空気清浄機の自動制御に活用",
    req:["identify","air-quality"], opt:["temperature-measurement","humidity-measurement"],
    tags:["センサー","空気質","PM2.5","CO2","VOC","空気清浄機","換気"],
    notes:"Apple HomeやGoogle Homeで空気質データを確認できる。空気が悪くなったら空気清浄機を自動でオンにするオートメーションが人気。"
  },
  { id:"water-leak-detector", deviceTypeId:"0x0043", name:"Water Leak Detector", nameJa:"水漏れ検知センサー", category:"sensor", icon:"🌊",
    description:"キッチン・洗面所などの水漏れを検知するセンサー。止水バルブとの連携で自動止水も可能",
    req:["identify","boolean-state"], opt:[],
    tags:["センサー","水漏れ","漏水","キッチン","洗面所"],
    notes:"Water Valveと組み合わせることで漏水検知→自動止水が実現。マンション・共働き家庭での安心感に。"
  },
  { id:"rain-sensor", deviceTypeId:"0x0044", name:"Rain Sensor", nameJa:"雨センサー", category:"sensor", icon:"🌧",
    description:"雨の降り始めを検知するセンサー。散水停止・窓の自動クローズ・洗濯物取り込み通知に活用",
    req:["identify","boolean-state"], opt:[],
    tags:["センサー","雨","散水","窓","洗濯"],
    notes:"散水システムと組み合わせて「雨が降ったら自動的に散水を止める」用途が典型的な活用法。"
  },

  // ===== 玄関・扉・窓 =====
  { id:"door-lock-dev", deviceTypeId:"0x000A", name:"Door Lock", nameJa:"スマートロック", category:"entry", icon:"🔐",
    description:"PIN・指紋・顔認証・AliroデジタルキーなどマルチモーダルなスマートロックDeviceType",
    req:["identify","door-lock"], opt:[],
    tags:["ロック","施錠","解錠","PIN","指紋","Aliro","デジタルキー","玄関"],
    notes:"iPhoneウォレットでドアを開けるAliro規格にも対応（製品次第）。誰がいつ解錠したかのログもApple Homeのアクティビティで確認可能。"
  },
  { id:"window-covering-dev", deviceTypeId:"0x0202", name:"Window Covering", nameJa:"電動ブラインド・カーテン", category:"entry", icon:"🪟",
    description:"電動ブラインド・ロールスクリーン・電動カーテンを制御。開閉率・チルト角度に対応",
    req:["identify","window-covering"], opt:[],
    tags:["ブラインド","カーテン","電動","遮光","日射","採光"],
    notes:"日の出・日の入りのタイミングでブラインドを自動開閉させるオートメーションが人気。照度センサーと組み合わせると細かい制御も可能。"
  },
  { id:"closure", deviceTypeId:"0x0230", name:"Closure", nameJa:"クロージャー（新世代開閉デバイス）", category:"entry", icon:"🚪",
    description:"v1.5で大幅拡張。窓・ドア・キャビネット・ゲート・ガレージドアなど複雑な開閉機構に対応",
    req:["identify","closure-control"], opt:[],
    tags:["クロージャー","窓","ドア","ガレージ","ゲート","v1.5新規"],
    notes:"Matter 1.5で新しく追加されたデバイスタイプ。複数のClosurePanelを子デバイスとして持てるため、観音開きのドアやガレージシャッターなど複雑な構造にも対応。"
  },

  // ===== HVAC =====
  { id:"thermostat-dev", deviceTypeId:"0x0301", name:"Thermostat", nameJa:"サーモスタット（温度調節器）", category:"hvac", icon:"🌡",
    description:"空調の司令塔。温度・湿度・在室状態を読み取り、エアコン・床暖房・換気を統合制御",
    req:["identify","thermostat"], opt:["temperature-measurement","occupancy-sensing","fan-control"],
    tags:["サーモスタット","エアコン","温度制御","在室連動","省エネ","HVAC"],
    notes:"温度センサー・在室センサーをClientとして読み取りながら、エアコンや床暖房を最適に制御。在室時・不在時で設定温度を変えることで省エネに。"
  },
  { id:"fan-dev", deviceTypeId:"0x002B", name:"Fan", nameJa:"ファン（扇風機・シーリングファン）", category:"hvac", icon:"🌀",
    description:"扇風機・シーリングファン・換気扇の速度・方向・首振りを制御するデバイスタイプ",
    req:["identify","fan-control"], opt:[],
    tags:["ファン","扇風機","シーリングファン","換気","首振り","HVAC"],
    notes:"Fan ControlクラスターでMultiSpeed・Auto・Wind（自然風）・Rocking（首振り）などをサポート。"
  },
  { id:"air-purifier", deviceTypeId:"0x002D", name:"Air Purifier", nameJa:"空気清浄機", category:"hvac", icon:"🌬",
    description:"ファン制御と空気質センサーを組み合わせた空気清浄機デバイスタイプ",
    req:["identify","fan-control"], opt:["air-quality"],
    tags:["空気清浄機","HVAC","PM2.5","空気質","自動運転"],
    notes:"空気質センサーと連携して、空気が悪化したら自動で強運転にするオートメーションが実現できます。"
  },

  // ===== 家電 =====
  { id:"refrigerator", deviceTypeId:"0x0070", name:"Refrigerator", nameJa:"冷蔵庫", category:"appliances", icon:"🧊",
    description:"コンポーズド構成で冷蔵室・冷凍室を個別管理できる冷蔵庫デバイスタイプ",
    req:["identify"], opt:["operational-state"],
    tags:["家電","冷蔵庫","冷凍庫","温度管理"],
    notes:"冷蔵庫→子エンドポイント：冷蔵室・冷凍室・製氷室という階層構造で定義。日本でのMatter対応冷蔵庫はまだ普及段階（2026年現在）。"
  },
  { id:"laundry-washer", deviceTypeId:"0x0073", name:"Laundry Washer", nameJa:"洗濯機", category:"appliances", icon:"🫧",
    description:"洗濯完了通知・モード管理に対応した洗濯機デバイスタイプ。安全機能のDeadFront対応が必須",
    req:["identify","on-off","laundry-washer-mode","operational-state"], opt:[],
    tags:["家電","洗濯機","洗濯完了通知","モード管理"],
    notes:"On/OffクラスターのDeadFrontBehavior（運転中はパネルを無効化）が必須仕様。洗濯完了時にOperationCompletionイベントが発生し、スマートフォンへの通知が可能になります。"
  },

  // ===== ロボット =====
  { id:"robotic-vacuum", deviceTypeId:"0x0074", name:"Robotic Vacuum Cleaner", nameJa:"ロボット掃除機", category:"robot", icon:"🤖",
    description:"Matter対応ロボット掃除機。複数エコシステムから統一して制御・状態監視が可能に",
    req:["identify","rvc-operational-state"], opt:["operational-state"],
    tags:["ロボット掃除機","自動掃除","帰宅前掃除"],
    notes:"RVC Operational Stateクラスターで掃除機特有の状態を管理。「外出中に掃除して帰宅前にドックに戻る」オートメーションが作れます。"
  },

  // ===== エネルギー =====
  { id:"evse", deviceTypeId:"0x050C", name:"EVSE", nameJa:"EV充電器", category:"energy", icon:"🔋",
    description:"電気自動車（EV）の充電器デバイスタイプ。太陽光余剰電力でのスマートチャージに対応",
    req:["identify","energy-evse"], opt:["device-energy-management"],
    tags:["EV","電気自動車","充電器","太陽光","スマートチャージ","省エネ"],
    notes:"Device Energy Managementとの連携で「太陽光発電の余剰電力でEVを充電する」スマートチャージが実現。"
  },
  { id:"solar-power", deviceTypeId:"0x0017", name:"Solar Power", nameJa:"太陽光発電", category:"energy", icon:"☀️",
    description:"家庭の太陽光発電システムをMatter上で管理するデバイスタイプ。発電量・売電量の計測に対応",
    req:["identify"], opt:["device-energy-management"],
    tags:["太陽光","発電","再生可能エネルギー","売電","省エネ"],
    notes:"電力計測と組み合わせて発電量・消費量を計測。Device Energy Managementと連携することで発電量に応じて家電の動作タイミングを最適化できます。"
  },
  { id:"battery-storage", deviceTypeId:"0x0018", name:"Battery Storage", nameJa:"蓄電池", category:"energy", icon:"🪫",
    description:"家庭用蓄電池のデバイスタイプ。太陽光・EVと組み合わせたエネルギーマネジメントに対応",
    req:["identify"], opt:["device-energy-management"],
    tags:["蓄電池","バッテリー","太陽光","エネルギー管理","停電対策"],
    notes:null
  },

  // ===== カメラ =====
  { id:"camera", deviceTypeId:"0x0142", name:"Camera", nameJa:"スマートカメラ", category:"camera", icon:"📷",
    description:"WebRTCによるリアルタイム映像配信に対応した基本のスマートカメラ。v1.5で正式追加",
    req:["identify","camera-av-stream","webrtc-transport"], opt:["occupancy-sensing"],
    tags:["カメラ","監視","セキュリティ","WebRTC","リアルタイム映像","v1.5新規"],
    notes:"Matter 1.5でカメラが正式対応。TLS証明書とNTP時刻同期が必須要件。WebRTCによりリアルタイム映像をMatter経由で視聴可能に。"
  },
  { id:"video-doorbell", deviceTypeId:"0x0143", name:"Video Doorbell", nameJa:"ビデオドアベル", category:"camera", icon:"🔔",
    description:"カメラ付きのスマートドアベル（インターホン）。Cameraのスーパーセット",
    supersetOf:["camera"], req:["identify","camera-av-stream","webrtc-transport"], opt:["occupancy-sensing"],
    tags:["ドアベル","インターホン","カメラ","玄関","来客通知","v1.5新規"],
    notes:"来客がベルを押すとスマートフォンに通知が届き、映像を確認しながら会話できます。"
  },
  { id:"floodlight-camera", deviceTypeId:"0x0144", name:"Floodlight Camera", nameJa:"フラッドライト付きカメラ", category:"camera", icon:"🔦",
    description:"強力な照明を内蔵したセキュリティカメラ。Cameraのスーパーセット。人感検知で自動点灯も対応",
    supersetOf:["camera"], req:["identify","camera-av-stream","webrtc-transport","on-off"], opt:["occupancy-sensing","level-control"],
    tags:["カメラ","フラッドライト","セキュリティ","屋外","人感照明","v1.5新規"],
    notes:null
  },

  // ===== メディア =====
  { id:"casting-video-player", deviceTypeId:"0x0023", name:"Casting Video Player", nameJa:"キャスト対応動画プレーヤー", category:"media", icon:"📺",
    description:"スマートTV・Apple TV・Chromecast等のキャスト受信対応動画プレーヤー",
    req:["identify","media-playback"], opt:[],
    tags:["スマートTV","Apple TV","Chromecast","動画","メディア","キャスト"],
    notes:"Apple TV・Google TV・Amazon Fire TVなどがこのタイプ。Matter経由でメディア再生・音量制御などができます。"
  },
  { id:"speaker", deviceTypeId:"0x0022", name:"Speaker", nameJa:"スマートスピーカー", category:"media", icon:"🔊",
    description:"スマートスピーカーのデバイスタイプ。音声再生・音量制御に対応",
    req:["identify"], opt:["media-playback"],
    tags:["スピーカー","音楽","音声","HomePod","Amazon Echo"],
    notes:null
  },

  // ===== ユーティリティ =====
  { id:"bridged-node", deviceTypeId:"0x0013", name:"Bridged Node", nameJa:"ブリッジノード（他規格の橋渡し）", category:"utility", icon:"🔀",
    description:"Zigbee・Z-WaveなどMatter非対応デバイスをMatter Fabricに接続する橋渡し役",
    req:["identify"], opt:[],
    tags:["ブリッジ","Zigbee","Z-Wave","橋渡し","レガシー機器"],
    notes:"既存のZigbee機器をMatter化できるブリッジ（例：Hue Bridge・Aqara Hub M2）がこのデバイスタイプを使います。"
  },
  { id:"aggregator", deviceTypeId:"0x000E", name:"Aggregator", nameJa:"アグリゲーター（ハブ）", category:"utility", icon:"🏠",
    description:"複数の機器を1つにまとめて提示するデバイス。スマートホームハブが典型例",
    req:["identify"], opt:[],
    tags:["ハブ","アグリゲーター","スマートホームハブ"],
    notes:"HomePod・Apple TV・Alexa・Google Nestなどのスマートホームハブがこのタイプに相当します。"
  },
  { id:"thread-border-router", deviceTypeId:"0x0091", name:"Thread Border Router", nameJa:"Threadボーダールーター", category:"utility", icon:"📡",
    description:"ThreadデバイスとWi-Fiネットワークを繋ぐ橋渡しデバイス。HomePod mini等が担当",
    req:["identify"], opt:[],
    tags:["Thread","ボーダールーター","HomePod","ネットワーク","インフラ"],
    notes:"Apple製品ではHomePod mini / HomePod / Apple TV 4KがThreadボーダールーターになれます。Threadデバイス（センサー等）を使うためには必要。"
  }
];

# 基本操作

![use-case-pc-angled-view](images/product/use-case-pc-angled-view.jpg)

## 💻 互換性

- **ホストソフトウェア**: macOS、Windows、Linux用の[ホストアプリ](/app)をインストールして、ターゲットデバイスを制御します。ホストシステムが対応するアプリバージョンと互換性があることを確認してください。
- **ターゲットデバイスの互換性**: ターゲットデバイスには事前のインストールや設定は不要です。ターゲットデバイスがビデオ出力（例：HDMI、VGA）をサポートし、USBポートを介してエミュレートされたキーボードおよびマウス制御（HID）信号を受信できる限り、使用可能です。対応するターゲットプラットフォームには、Windows、macOS、Linux、Android、iOSが含まれます。

## 🖱 マウス制御

- **絶対モード**: ターゲットのマウスカーソルは、ホストの画面上の特定の位置に直接マッピングされます。つまり、ホストのマウスをアプリ内で動かすと、ターゲットのマウスも同じ動きをします。カーソルの動きに若干の遅延がある場合があります。アプリ内でホストのマウスカーソルを表示するか非表示にするかを選択できます。

- **相対モード**: ターゲットのマウスの動きは、ホストのマウスの現在の位置に対して相対的です。つまり、ホストのマウスを動かすと、ターゲットのカーソルが同じ方向に一定の距離だけ移動します。特定のショートカットを使用してこの相対モードを終了できます。

## ⌨️ キーボード

アプリがフォーカスされているとき、何でも直接入力でき、そのキー入力はターゲットのコンピュータに送信されます。

## ⚙️ BIOSレベルのアクセス

- **BIOSアクセス**: アプリを使用してターゲットデバイスのBIOSにアクセスできます。これにより、BIOSから直接設定を制御および構成できます。

??? tip "異なるマザーボードのBIOSに入るためのキー"

    - F2: Dell、Lenovo、ASUS、Acer、Toshiba、Samsung、Sony
    - F1: Lenovo
    - Del: ASUS、Acer、Gigabyte、MSI
    - F10: HP
    - Assistボタン: Sony
    - Option (⌥)キー: Apple（スタートマネージャにアクセスするため）

## 🔊 サウンド

- **オーディオ伝送**: ターゲットコンピュータのオーディオは、mini-KVMのHDMI入力ポートを介して伝送されます。アプリを使用すると、ターゲットコンピュータの音声がホストコンピュータを通じて再生され、シームレスに聞くことができます。

## 🎥 ビデオ

- **ビデオ表示**: アプリを使用してターゲットコンピュータの画面をシームレスに表示できます。アプリ内での表示は最大1920x1080の解像度で30Hzまでサポートします。HDMIを介して最大3840x2160の解像度で30Hzまでのビデオ入力をサポートします。さらに、アダプターを使用することで、VGA、Micro HDMI、DVIなどのビデオ入力ソースにも対応できます。

## 🔄 切り替え可能なUSBポート

- **USBポートの使用**: mini-KVMには、ホストとターゲットコンピュータ間で切り替え可能なUSB-A 2.0ポートがあり、同時に両方に接続することはできません。
- **切り替え方法**: 
    - ハードウェアスイッチ: デバイス上の物理的なトグル
    - ソフトウェアスイッチ: ホストアプリケーション内のボタン
- **スイッチロジック**: ハードウェアおよびソフトウェアスイッチの相互作用、初期設定、動作状態、状態遷移など、切り替え可能なUSBポートの動作ロジックの詳細については、[USBスイッチのドキュメント](usb-switch.md)を参照してください。

!!! warning "重要"
    - ポートの接続を切り替える前に、接続されているUSBドライブを必ず取り出してください。
    - USBポートには電力制限があります。多くの電力を必要とするデバイスを接続しないでください。これにより、不安定な動作や潜在的な損傷が発生する可能性があります。

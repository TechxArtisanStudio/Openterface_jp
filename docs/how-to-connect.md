# 接続方法

## インターフェース

![host-side](images/product/host-htc.svg#only-light){:style="width:360px"}

![target-side](images/product/target-htc.svg#only-light){:style="width:360px"}

![host-side](images/product/host-htc_1.svg#only-dark){:style="width:360px"}

![target-side](images/product/target-htc_1.svg#only-dark){:style="width:360px"}

① ![Type-C to Host](images/shell-icons/host.svg#only-light){:style="height:15px"} ![Type-C to Host](images/shell-icons/host_1.svg#only-dark){:style="height:15px"} - **ホストUSB-Cポート** (メス): USBデバイスポートとして、内蔵USBハブを介してデータ転送のためにホストコンピュータに接続します。

② ![Type-C to Target](images/shell-icons/target.svg#only-light){:style="height:18px"} ![Type-C to Target](images/shell-icons/target_1.svg#only-dark){:style="height:18px"} - **ターゲットUSB-Cポート** (メス): USBデバイスポートとして、内蔵USBハブを介してキーボードとマウスのHID出力をエミュレートするためにホストコンピュータに接続します。

③ ![HDMI Input](images/shell-icons/input.svg#only-light){:style="height:18px"} ![HDMI Input](images/shell-icons/input_1.svg#only-dark){:style="height:18px"} - **HDMI入力ポート** (メス): ターゲットコンピュータからのHDMIソース入力。

④ ![USB-A Port](images/shell-icons/switchable-usb.svg#only-light){:style="height:26px"} ![USB-A Port](images/shell-icons/switchable-usb_1.svg#only-dark){:style="height:26px"} - **切り替え可能なUSB-A 2.0ポート** (メス): USBホストポートとして、ホストコンピュータまたはターゲットコンピュータのいずれか一方で使用されますが、同時には使用できません。

!!! warning "きついフィット"
    このUSB-Aメスポートはロック機構が設計されており、USBデバイスの接続と取り外しには少し力が必要です。

⑤ ![Toggle Switch](images/shell-icons/toggle-h-t.svg#only-light){:style="height:20px"} ![Toggle Switch](images/shell-icons/toggle-h-t_1.svg#only-dark){:style="height:20px"} - **トグルスイッチ**: USB-A 2.0ポートの接続をホストとターゲットコンピュータの間で切り替えるためのスイッチ。

⑥ ![Extension Pins](images/shell-icons/pins.svg#only-light){:style="height:15px"} ![Extension Pins](images/shell-icons/pins_1.svg#only-dark){:style="height:15px"} - **拡張ピン**: 詳細については、開発者向けの[拡張ピン](/extension-pin)をご覧ください。

## 接続手順

![to-host](images/product/to-host.svg#only-light){:style="height:260px"} ![to-host](images/product/to-host_1.svg#only-dark){:style="height:260px"}
![to-target](images/product/to-target.svg#only-light){:style="height:260px"} ![to-target](images/product/to-target_1.svg#only-dark){:style="height:260px"}

Mini-KVMをセットアップするには、以下の手順に従ってください：

1. **ホストコンピュータの接続** (オレンジ側):
    - オレンジの1.5m Type-C USBケーブルを使用して、ホストコンピュータをMini-KVMに接続します。オレンジ側のType-Cメスポートに差し込みます。

    !!! note "ホストアプリが必要"
        ホストコンピュータにはホストアプリがインストールされている必要があります。詳細およびダウンロードリンクについては、[アプリドキュメント](/app)をご参照ください。

2. **ターゲットデバイスの接続** (ブラック側):
    - ブラックの0.3m Type-C USBケーブルを使用して、ターゲットデバイスをMini-KVMに接続します。ブラック側のType-Cメスポートに差し込みます。

3. **ターゲットビデオ出力の接続** (ブラック側):
    - ターゲットデバイスのビデオ出力ポートをMini-KVMのHDMIメスポートに接続します。ブラックの0.3m HDMIケーブル、またはVGA-to-HDMI変換ケーブルなどの適切なビデオソース-to-HDMIケーブルを使用します。

    !!! note "ターゲットにはアプリ不要"
        ターゲットデバイスには事前のインストールや設定は不要です。ターゲットデバイスがビデオ出力（HDMI、VGAなど）をサポートし、エミュレートされたキーボードとマウスの制御（HID）信号を受信するためのUSBポートを持っている限り、使用できます。したがって、サポートされるターゲットデバイスプラットフォームには、Windows、macOS、Linux、Android、およびiOSが含まれます。

4. **切り替え可能なUSB-A 2.0ポートの接続** (オプション):
    - 切り替え可能なUSB-A 2.0ポートにUSBデバイスを接続したい場合は、上記の3つの接続を完了し、ホストアプリが開いていることを確認した後に行うことをお勧めします。
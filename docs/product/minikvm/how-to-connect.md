---
title: "接続方法"
description: "Openterface Mini-KVMの設定手順を詳しく説明します。ホストコンピュータとターゲットデバイスをUSB-C、HDMI、周辺機器接続の詳細な手順で接続する方法を学びます。インターフェースの説明や重要な設定のヒントも含まれています。"
keywords: "Mini-KVM 設定, KVM 接続ガイド, USB-C KVM 設定, HDMI KVM 接続, KVM インストールガイド, コンピュータ周辺機器設定, USBデバイス接続, KVM インターフェースガイド, ヘッドレスコンピュータ設定, KVM 構成"
---

# **接続方法** | 設定ガイド | Openterface Mini-KVM

## 接続手順

![to-host](https://assets.openterface.com/images/product/to-host.svg#only-light){:style="height:260px"} ![to-host](https://assets.openterface.com/images/product/to-host_1.svg#only-dark){:style="height:260px"}
![to-target](https://assets.openterface.com/images/product/to-target.svg#only-light){:style="height:260px"} ![to-target](https://assets.openterface.com/images/product/to-target_1.svg#only-dark){:style="height:260px"}

Mini-KVMを設定するには、以下の手順に従ってください。

1. **ホストコンピュータの接続**（オレンジ側）:
    - オレンジの1.5m Type-C USBケーブルを使用して、ホストコンピュータをMini-KVMに接続します。Mini-KVMのオレンジ側にあるType-Cメスポートに差し込みます。

    !!! note "ホストアプリが必要"
        ホストコンピュータにはホストアプリがインストールされている必要があります。詳細情報やダウンロードリンクについては、[アプリ](/app)ページを参照してください。

2. **ターゲットデバイスの接続**（黒側）:
    - 黒の0.3m Type-C USBケーブルを使用して、ターゲットデバイスをMini-KVMに接続します。Mini-KVMの黒側にあるType-Cメスポートに差し込みます。

3. **ターゲットビデオ出力の接続**（黒側）:
    - ターゲットデバイスのビデオ出力ポートをMini-KVMの黒側にあるHDMIメスポートに接続します。黒の0.3m HDMIケーブル、またはVGAからHDMIへの変換ケーブルなど、適切なビデオソースからHDMIへのケーブルを使用します。

    !!! note "ターゲットにはアプリは不要"
        ターゲットデバイスには事前のインストールや設定は必要ありません。ターゲットデバイスがビデオ出力（HDMI、VGAなど）でUI操作をサポートし、エミュレートされたキーボードとマウスの制御（HID）信号を受信するUSBポートを持っていれば使用できます。したがって、サポートされているターゲットデバイスプラットフォームには、Windows、macOS、Linux、Android、iOSが含まれます。

4. **切り替え可能なUSB-A 2.0ポートの接続**（オプション）:
    - 切り替え可能なUSB-A 2.0ポートにUSBデバイスを接続したい場合は、上記の3つの接続を完了し、ホストアプリが開いていることを確認した後に行うことをお勧めします。

## インターフェース

![host-side](https://assets.openterface.com/images/product/host-htc.svg#only-light){:style="width:360px"}

![target-side](https://assets.openterface.com/images/product/target-htc.svg#only-light){:style="width:360px"}

![host-side](https://assets.openterface.com/images/product/host-htc_1.svg#only-dark){:style="width:360px"}

![target-side](https://assets.openterface.com/images/product/target-htc_1.svg#only-dark){:style="width:360px"}

① ![Type-C to Host](https://assets.openterface.com/images/shell-icons/host.svg#only-light){:style="height:15px"} ![Type-C to Host](https://assets.openterface.com/images/shell-icons/host_1.svg#only-dark){:style="height:15px"} - **ホストUSB-Cポート**（メス）: USBデバイスポートとして、ホストコンピュータに接続し、内蔵USBハブを介してデータ転送を行います。

② ![Type-C to Target](https://assets.openterface.com/images/shell-icons/target.svg#only-light){:style="height:18px"} ![Type-C to Target](https://assets.openterface.com/images/shell-icons/target_1.svg#only-dark){:style="height:18px"} - **ターゲットUSB-Cポート**（メス）: USBデバイスポートとして、ホストコンピュータに接続し、内蔵USBハブを介してキーボードとマウスのHID出力をエミュレートします。

③ ![HDMI Input](https://assets.openterface.com/images/shell-icons/input.svg#only-light){:style="height:18px"} ![HDMI Input](https://assets.openterface.com/images/shell-icons/input_1.svg#only-dark){:style="height:18px"} - **HDMI入力ポート**（メス）: ターゲットコンピュータからのHDMIソース入力。

④ ![USB-A Port](https://assets.openterface.com/images/shell-icons/switchable-usb.svg#only-light){:style="height:26px"} ![USB-A Port](https://assets.openterface.com/images/shell-icons/switchable-usb_1.svg#only-dark){:style="height:26px"} - **切り替え可能なUSB-A 2.0ポート**（メス）: USBホストポートとして、ホストコンピュータまたはターゲットコンピュータのいずれか一方で使用されますが、同時には使用できません。詳細は[USBポート切り替えガイド](../usb-switch)を確認してください。

!!! warning "USB電力制限"
    USBポートから供給される電力はホストマザーボードに依存します。多くの電力を必要とするUSBデバイスを接続することは推奨されません。通常、電力消費は1.5Wを超えないようにしてください。高出力デバイスを接続すると、動作が不安定になったり、損傷の可能性があります。

!!! warning "USB-Aポートにはしっかりとしたロッキング機構があります"
    USB-Aポートには、デバイスを差し込んだり取り外したりする際に追加の力が必要なロッキング機構が含まれています。これは意図的なもので、接続を確実にします。**非常に小さなUSBデバイス**（超コンパクトなUSBドライブなど）の使用は避けてください。これらは握りにくく、取り外すのが難しい場合があり、損傷の原因となる可能性があります。

!!! warning "追加のUSBハブは外部電源が必要で、互換性に影響を与える可能性があります"
    Mini-KVMには、ホストとターゲットコンピュータの両方に接続する内蔵USBハブがすでに含まれています。USB-Aポートに追加の外部USBハブを接続すると、そのハブに接続されたUSBデバイスはUSBデバイストリーのより深いレベルで動作します。一部のコンピュータにはUSBツリーの深さに制限があり、互換性の問題を引き起こしたり、特定のデバイスが正しく動作しない原因となることがあります。

    また、接続するUSBハブは外部電源が供給されていることを確認してください。電源が供給されていないハブは、Mini-KVM全体の不安定さや故障を引き起こす可能性があります。

⑤ ![Toggle Switch](https://assets.openterface.com/images/shell-icons/toggle-h-t.svg#only-light){:style="height:20px"} ![Toggle Switch](https://assets.openterface.com/images/shell-icons/toggle-h-t_1.svg#only-dark){:style="height:20px"} - **トグルスイッチ**: USB-A 2.0ポートの接続をホストとターゲットコンピュータの間で切り替えるためのスイッチ。

⑥ ![Extension Pins](https://assets.openterface.com/images/shell-icons/pins.svg#only-light){:style="height:15px"} ![Extension Pins](https://assets.openterface.com/images/shell-icons/pins_1.svg#only-dark){:style="height:15px"} - **拡張ピン**: デフォルトでは隠されており、別のキャップに交換することでのみアクセス可能です。詳細については、開発者向けの[拡張ピン](../extension-pins)を確認してください。
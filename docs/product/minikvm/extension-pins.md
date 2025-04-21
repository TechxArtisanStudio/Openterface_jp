---
title: "拡張ピン"
description: "Openterface Mini-KVMの拡張ピンの可能性を探り、カスタムハードウェア開発やオープンソースプロジェクトに活用しましょう。"
keywords: "Mini-KVM 拡張ピン, カスタム開発, ハードウェア改造, オープンソース KVM"
---

# **拡張ピン** | 開発者モード | Openterface Mini-KVM

![mini-kvm-pins-port](https://assets.openterface.com/images/product/mini-kvm-pins-port.webp){:style="height:360px"}
![pin-cap](https://assets.openterface.com/images/product/part/pin-cap.webp){:style="height:300px"}

Openterface Mini-KVMは、先進的な開発や[オープンソフトウェア](/app)の実験のための拡張ピンを備えています。これらのピンは、標準のケース構成では露出していません。

## ピンへのアクセス方法

1. デバイスを分解します。
2. 元のケースカバーを専用の拡張ピンキャップに交換します。
3. 拡張ピンキャップの[3Dモデル](https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware/tree/main/models)をダウンロードします。
4. [ハードウェアGitHubリポジトリ](https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware)をチェックしてください。

![change-cap](https://assets.openterface.com/images/product/change-cap.svg#only-light){:style="height:300px"}
![change-cap](https://assets.openterface.com/images/product/change-cap_1.svg#only-dark){:style="height:300px"}

!!! warning "保証無効"
    元のケースを取り外すと、製品の保証が無効になる可能性があります。すべての改造や分解は、ユーザーの自己責任で行ってください。

!!! note "実験的機能"
    これらのピンを使用して開発された機能は実験的であり、完全にテストされていません。Openterfaceは、改造、拡張ピンの露出、またはデバイスのその他の変更によって生じた損害、怪我、または故障について責任を負いません。

## ピン構成

![target-side](https://assets.openterface.com/images/product/extension-pins-1.svg#only-light){:style="height:200px"}
![host-side](https://assets.openterface.com/images/product/extension-pins-2.svg#only-light){:style="height:200px"}
![target-side](https://assets.openterface.com/images/product/extension-pins-1_1.svg#only-dark){:style="height:200px"}
![host-side](https://assets.openterface.com/images/product/extension-pins-2_1.svg#only-dark){:style="height:200px"}

拡張ピンは以下の接続を提供します：

1. 外部コンポーネント用のUSB 5V電源
2. ホストのUSBハブへのデータ正
3. ホストのUSBハブへのデータ負
4. ターゲットのUSBハブへのデータ正
5. ターゲットのUSBハブへのデータ負
6. グラウンド

!!! danger "不適切な接続は損傷を引き起こす"
    VCCとGNDを混同すると、デバイスや接続されたコンポーネントに深刻な損傷を与える可能性があります。デバイスの電源を入れる前に、ピン接続を必ず再確認してください。

## 拡張ピンキャップ

![pin-cap](https://assets.openterface.com/images/product/part/pin-cap.webp){:style="height:360px"}

この3Dプリントの拡張ピンキャップは、Openterface Mini-KVMの元のキャップを置き換え、上級ユーザーが拡張ピンにアクセスできるようにします。3DモデルファイルはGitHubリポジトリからダウンロードして、自分でキャップを印刷できます。

- **使用目的**: 高度なハードウェア開発のための拡張ピンへのアクセスを提供します。
- **ダウンロード**: [3Dモデルファイル](https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware/tree/main/models)

## 開発に参加しよう

私たちは開発と実験を続けており、これらのピンが何をできるか、どのように創造的に使用できるかについての情報をこのセクションで更新していきます。あなたの創造性と専門知識が、Openterface Mini-KVMの可能性を広げる手助けになります。ぜひ参加してください：

1. **アイデアを共有する**: これらのピンを使用するためのクールなコンセプトはありますか？ぜひお聞かせください！
2. **DIYプロジェクトに貢献する**: 面白いものを作成した場合は、[Discord Openterface](/discord)コミュニティで共有を検討してください。
3. **ディスカッションに参加する**: 他の開発者や愛好者とつながり、ブレインストーミングやコラボレーションを行いましょう。

共に構築し、革新を進めましょう！
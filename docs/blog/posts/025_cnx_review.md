---
date: 2024-05-09
authors:
  - CNXSOFT
categories:
  - 技術レビュー
---

# Openterface Mini-KVM: 手頃な価格のKVM-over-USBデバイス (クラウドファンディング)
**2024年5月9日 ジャン=リュック・オフラン (CNXSOFT)**

**Openterface Mini-KVM**は、HDMIおよびオーディオ入力を備えた、USB-Cポートを介してホストコンピュータに接続するコンパクトなオープンソースハードウェアKVM-over-USBデバイスです。

これまでに数多くの低コストの[KVM-over-IP](https://www.cnx-software.com/2023/04/18/blikvm-open-source-kvm-over-ip-raspberry-pi-cm4-raspberry-pi-hat-pcie-board-allwinner-h616/)ソリューションをシングルボードコンピュータに基づいて見てきましたが、**Openterface Mini-KVM**は、プラグアンドプレイでネットワークに依存しないKVM-over-USBデバイスとして、ホストコンピュータとターゲットデバイスの間に直接HDMIおよびUSB接続を確立する点で非常に異なります（そして安価です）。ATXサポートなどの機能を除いて、[PiKVM v4 Plus](https://docs.pikvm.org/v4/)や拡張ボードを使用してホストデバイスからターゲットデバイスをオフにできる[Pi-Cast KVM](https://www.cnx-software.com/2023/12/24/pi-cast-portable-kvm-switch-raspberry-pi-cm4/)と同様の機能を多数サポートしています。

<!-- more -->

![Openinterface-Mini-KVM-1](https://www.cnx-software.com/wp-content/uploads/2024/05/Openinterface-Mini-KVM-1.jpg)

## Mini-KVM (モデルLIG03D01) の仕様:
- **制御方法**: KVM-over-USB
- **ビデオキャプチャ**: HDMIまたはVGA（後者は追加のVGA-to-HDMIケーブルが必要）を介して1920×1080 @ 30 Hzまで、140ms以下の遅延
- **オーディオキャプチャ**: HDMIを介して
- **テキスト転送**: エミュレートされたキーボード出力を介して、ホストからターゲットデバイスにテキストを送信できます。ユーザー名、パスワード、コードスニペットのコピーに便利です。
- **USBポート**: USB 2.0 タイプAポートは、USBドライバから/へのファイル転送や他のUSBデバイスの共有のためにホストまたはターゲットに切り替え可能
- **BIOSアクセス**: ファームウェアの更新やスタートアップ管理のためのターゲットデバイスのBIOSへの直接アクセス
- **電源供給**: ホストコンピュータからのUSB-Cを介して
- **寸法**: 61 x 53 x 13.5 mm
- **重量**: 48グラム

![KVM-over-USB-Raspberry-Pi-target-laptop-guest.webp](https://www.cnx-software.com/wp-content/uploads/2024/05/KVM-over-USB-Raspberry-Pi-target-laptop-guest.webp)

ホストアプリケーションは**macOS、Windows、Linux、Android**向けに間もなく利用可能になります。各アプリの開発をフォローし、ハードウェア設計ファイルにアクセスするには、以下のGitHubリポジトリで確認できます（現在は全て空です）:
- **Openterface_MacOS** – MacOS用ホストアプリケーション
- **Openterface_QT** – WindowsおよびLinux用ホストアプリケーション
- **Openterface_Android** – Androidサポート用ホストアプリケーション
- **Openterface_Mini-KVM_Hardware** – ハードウェア設計、回路図およびコンポーネント

TECHxARTISAN社によると、KVM-over-USBソリューションは以下の用途に有用です:
- サーバーのトラブルシューティングを行うITプロフェッショナル
- ATM、VLT、キオスクを修理する技術者
- エッジコンピューティングデバイスを管理する開発者
- シングルボードコンピュータで実験する技術愛好家
- 暗号資産を管理するなど、ネットワーク分離において安全なローカル操作が必要なプロフェッショナル
- 個人用コンピュータと業務用コンピュータの間で頻繁に統合されたワークフローが必要な人

特に、追加のディスプレイ、キーボード、マウスなしでノートパソコンを使用してヘッドレスハードウェアにアクセスするのに便利です。

![Mini-KVM-vs-StarTech-Crash-Cart-NOTECONS02-KVM-over-USB](https://www.cnx-software.com/wp-content/uploads/2024/05/Mini-KVM-vs-StarTech-Crash-Cart-NOTECONS02-KVM-over-USB.webp)

Mini-KVMキットは、VGA入力をサポートするStarTech Crash Cart NOTECONS02 KVM-over-USBデバイスよりもかなり安価で、約$400で販売されています。また、KVM-over-IPソリューションよりも安価ですが、この比較表では[最も安価なオプション](https://www.cnx-software.com/2023/04/18/blikvm-open-source-kvm-over-ip-raspberry-pi-cm4-raspberry-pi-hat-pcie-board-allwinner-h616/)を選択したわけではありません...

TECHxARTISAN社は、$12,000の目標を既に超えたMini-KVMを[Crowd Supply](https://www.crowdsupply.com/techxartisan/openterface-mini-kvm)で立ち上げました。主なリワードは2つあります：

- **$79**: Openterface Mini-KVMとクイックスタートガイド
- **$99**: Openterface Mini-KVMツールキット（$79のリワードの項目に加え、30cm HDMIオス-to-オスケーブル、30cm USB-Cオス-to-USB-Aオスケーブル（USB-Aメス-to-USB-Cオスアダプタ付き）、1.5メートルUSB-Cオス-to-オスケーブル、ツールキットバッグ）

また、VGA + オーディオからHDMIへのコンバータもあり、サーバーシステムやVGAポートのみを持つ古いシステムに役立つ可能性があります。発送は米国に$8、その他の地域に$18の追加料金がかかります。支援者は、すべてが計画通りに進めば、2024年9月末までにリワードが発送されることを期待できます。追加の詳細は[プロジェクトのウェブサイト](http://openterface.com/)でも見つけることができます。

<iframe width="560" height="315" src="https://www.youtube.com/embed/6OWaVIRXCaw?si=KpzsXY0ET8KnG8qT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

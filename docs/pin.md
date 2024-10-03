# 拡張ピンガイドライン

![change-cap](images/product/change-cap.svg#only-light){:style="height:300px"}
![change-cap](images/product/change-cap_1.svg#only-dark){:style="height:300px"}

Openterface Mini-KVMには、高度な開発や[オープンソフトウェア](/app)の実験のための拡張ピンが搭載されています。これらのピンは標準のケース構成では露出していません。

### 開発用拡張ピンへのアクセス方法

拡張ピンにアクセスするには、以下の手順を行います：

1. デバイスを分解する
2. 元のケースカバーを専用の拡張ピンキャップに交換する
3. 拡張ピンキャップの3Dモデルを[GitHubリポジトリ](https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware)からダウンロードする

!!! warning "保証無効"
    元のケースを取り外すと製品保証が無効になります。すべての改造や分解はユーザー自身の責任で行ってください。

!!! note "実験的機能"
    これらのピンを使用して開発された機能は実験的であり、完全にはテストされていません。Openterfaceは、改造や拡張ピンの露出、その他の変更によって生じる損害、怪我、または故障について責任を負いません。

### ピン配置

![target-side](images/product/extension-pins-1.svg#only-light){:style="height:200px"}
![host-side](images/product/extension-pins-2.svg#only-light){:style="height:200px"}
![target-side](images/product/extension-pins-1_1.svg#only-dark){:style="height:200px"}
![host-side](images/product/extension-pins-2_1.svg#only-dark){:style="height:200px"}

拡張ピンは以下の接続を提供します：

1. 外部コンポーネント用のUSB 5V電源
2. ホストのUSBハブへのデータプラス
3. ホストのUSBハブへのデータマイナス
4. ターゲットのUSBハブへのデータプラス
5. ターゲットのUSBハブへのデータマイナス
6. グランド

!!! danger "誤った接続"
    VCCとGNDを間違えると、デバイスや接続されたコンポーネントに重大な損害を与える可能性があります。デバイスに電源を入れる前に、必ずピンの接続を再確認してください。

# 切り替え可能なUSBポートのメカニズム

![switch-graphics](images/product/switch-graphics.svg#only-light){:style="width:460px"}
![switch-graphics](images/product/switch-graphics_1.svg#only-dark){:style="width:460px"}

mini-KVMデバイスには、ホストコンピュータとターゲットコンピュータの間で切り替え可能なUSB-A 2.0ポートが搭載されていますが、同時に両方に接続することはできません。この機能は、物理的なトグルスイッチとホストアプリケーション内のソフトウェアスイッチの両方で制御されます。このドキュメントでは、これらのスイッチのメカニズムとロジックについて説明します。

## スイッチの種類

- **ソフトウェアスイッチ**: ホストアプリケーション内のトグルボタン。
      - USBポートの接続をホストコンピュータとターゲットコンピュータの間で切り替えます。

- ![Toggle Switch](images/shell-icons/toggle-h-t.svg#only-light){:style="height:20px"} ![Toggle Switch](images/shell-icons/toggle-h-t_1.svg#only-dark){:style="height:20px"} **ハードウェアスイッチ**: デバイス上の物理的な2ポジショントグルスイッチ。
      - 内側の位置: ホストコンピュータに接続
      - 外側の位置: ターゲットコンピュータに接続

## 初期設定と同期

mini-KVMが正しく接続され、ホストアプリが起動されると：

1. デバイスの実際のUSBポート接続（回路）は初期状態でホスト接続にデフォルト設定されます。
2. ホストアプリはハードウェアスイッチの現在の位置を検出し、ホストまたはターゲットコンピュータに設定されます。
3. ソフトウェアスイッチはハードウェアスイッチの位置と同期します。
4. 実際の回路接続はスイッチの位置に合わせて更新されます。

!!! warning "ハードウェアの制限"
    デバイスの電源を入れる前やホストアプリケーションを起動する前にUSBドライブが既に接続されている場合、ホストコンピュータは安全でないUSBデバイスの取り外しについて警告を発します。これはv1.9のハードウェアの制限です。そのため、デバイスの電源を入れる前やホストアプリを起動する前にUSBデバイスを接続しないことをお勧めします。

## 動作状態

ハードウェアスイッチとソフトウェアスイッチの両方が存在するため、4つの可能な状態が発生します：

- **状態1**（同期、ホストに接続）:
      - ハードウェアスイッチ: ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - ソフトウェアスイッチ: ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - USBポート接続: ホストに接続 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}

- **状態2**（同期、ターゲットに接続）:
      - ハードウェアスイッチ: ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - ソフトウェアスイッチ: ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - USBポート接続: ターゲットに接続 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}

- **状態3**（同期外、USBはホストに接続）:
      - ハードウェアスイッチ: ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - ソフトウェアスイッチ: ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - USBポート接続: ホストに接続 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}

- **状態4**（同期外、USBはターゲットに接続）:
      - ハードウェアスイッチ: ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - ソフトウェアスイッチ: ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - USBポート接続: ターゲットに接続 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}

## 状態遷移とロジック

### **状態1**（ホストに同期）から

- ^^***シナリオ1a***^^: ユーザーがハードウェアスイッチをターゲットに移動
      - 内部状態変数をターゲットに更新 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - ホストアプリケーションの表示をターゲットに更新 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - 実際の回路接続をターゲットに切り替え ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - 状態2に遷移、同期

- ***シナリオ1b***: ユーザーがソフトウェアスイッチをターゲットにクリック
      - 内部状態変数をターゲットに更新 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - ハードウェアスイッチの位置は変更されず（ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}）
      - 実際の回路接続をターゲットに切り替え ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - 状態3に遷移、同期外

### **状態2**（ターゲットに同期）から

- ^^***シナリオ2a***^^: ユーザーがハードウェアスイッチをホストに移動 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}:
      - 内部状態変数をホストに更新 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - ソフトウェアスイッチの表示をホストに更新 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - 実際の回路接続をホストに切り替え ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - 状態1に遷移、同期

- ***シナリオ2b***: ユーザーがソフトウェアスイッチをホストにクリック ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}:
      - 内部状態変数をホストに更新 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - ハードウェアスイッチの位置は変更されず（ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}）
      - 実際の回路接続をホストに切り替え ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - 状態4に遷移、同期外

### **状態3**（同期外、USBはホストに接続）から

- ^^***シナリオ3a***^^: ユーザーがハードウェアスイッチをターゲットに移動 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}:
      - 変数に変更なし
      - 状態2に遷移、同期

- ***シナリオ3b***: ユーザーがソフトウェアスイッチをホストにクリック ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}:
      - 内部状態変数をホストに更新 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - ハードウェアスイッチの位置は変更されず（ターゲットを指す ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}）
      - 実際の回路接続をホストに切り替え ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}
      - 状態1に遷移、同期

### **状態4**（同期外、USBはターゲットに接続）から

- ^^***シナリオ4a***^^: ユーザーがハードウェアスイッチをホストに移動 ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}:
      - 変数に変更なし
      - 状態1に遷移、同期

- ***シナリオ4b***: ユーザーがソフトウェアスイッチをターゲットにクリック ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}:
      - 内部状態変数をターゲットに更新 ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - ハードウェアスイッチの位置は変更されず（ホストを指す ![host-computer](images/shell-icons/host-computer.svg#only-light){:style="height:18px"} ![host-computer](images/shell-icons/host-computer_1.svg#only-dark){:style="height:18px"}）
      - 実際の回路接続をターゲットに切り替え ![target-computer](images/shell-icons/target-computer.svg#only-light){:style="height:18px"} ![target-computer](images/shell-icons/target-computer_1.svg#only-dark){:style="height:18px"}
      - 状態2に遷移、同期

!!! warning "スイッチを切り替える前にフラッシュドライブを取り出してください"
    USBポートがフラッシュドライブで使用されている場合、スイッチを切り替えてポートの使用を別のコンピュータに移す前に、必ずフラッシュドライブを取り出してください。

!!! warning "USBの電力制限"
    USBポートに供給される電力はホストのマザーボードに依存します。多くの電力を必要とするUSBデバイスを接続することはお勧めしません。通常、消費電力は1.5Wを超えないようにしてください。高電力デバイスを接続すると、不安定な動作や潜在的な損傷が発生する可能性があります。

!!! Note "ユーザーガイダンス"
    - **ソフトウェアスイッチの優先順位**: ハードウェアスイッチの位置に関係なく、ソフトウェアスイッチをクリックすると、回路の方向が即座に変更されます。

    - **ハードウェアスイッチの同期**: ハードウェアスイッチを手動で切り替えると、その状態がソフトウェアスイッチと一致し、同期外の状態3または状態4から状態1または状態2に遷移します。ただし、この同期は必ずしも実際の回路接続を変更するわけではありません。

    - **ハードウェアスイッチの監視**: ハードウェアスイッチは物理的なものであるにもかかわらず、ソフトウェアによって監視されており、回路の方向を直接制御するわけではありません。代わりに、ソフトウェアがスイッチの位置を解釈し、実際の回路切り替えを管理します。

## ソフトウェア制御のUSB切り替えが重要な理由

v1.9で導入されたソフトウェア制御のUSB切り替え機能は、特にVNCのようなKVM-over-IPソリューションをサポートするための将来の開発計画において重要な機能です。この機能により、ユーザーはリモートでUSBポートをターゲットコンピュータとホストコンピュータの間で切り替え、共有することができ、リモートセットアップでのファイル転送を容易にします。

この機能は、リモート管理と制御の可能性を広げます。例えば、物理的な介入なしにデバイス間でファイルを転送することができ、リモートトラブルシューティングやシステム管理の効率を向上させます。

この機能を活用するためのクリエイティブなアイデアがありますか？私たちはあなたとお話ししたいです！Openterfaceの[コミュニティ](https://openterface.com/community/)に参加して、あなたの考えを共有してください 😃

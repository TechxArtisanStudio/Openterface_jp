---
comments: true
---

# 基本操作テスト

<iframe width="560" height="315" src="https://www.youtube.com/embed/m7OpUem0zqY?si=3kHl1kmk6VQRnPu7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ERzpGtRvP2o?si=2DQrHqk-GhzvvL24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## マウス 🖱

- 絶対モード & 相対モード
    - 動作の遅延を確認し、スムーズで応答性のあるコントロールを保証。
    - マウス位置のマッピングの正確性
    - クリックテスト（シングルクリック、ダブルクリック）
    - ドラッグテスト

## キーボード ⌨️
- 特にさまざまな特殊記号に関するキーボードマッピングテスト
- タイピング応答性テスト
- 複数キー押下テスト
- ファンクションキーのテスト
- 異なる国のキーボードレイアウトでのテストを行い、一貫したペアリングを確認

!!! tip

    ホストコンピュータとターゲットコンピュータの両方でオンラインキーボードテストツールを利用して、キーストロークが同期しているかを確認できます。

## テキスト転送 📝
- テキスト転送機能：ホストアプリケーションがホストコンピュータからターゲットデバイスへテキストを[ASCIIコード](https://theasciicode.com.ar/)を使用して成功裏に転送できるか確認してください。
- コンテンツの完全性：ホストからターゲットデバイスへ転送されたテキスト内容が完全に保持され、正確に再現されることを確認してください。
- 特殊文字の取り扱い：様々なASCII文字を使用してテキスト転送機能をテストし、シンボル、句読点、非英数字文字を含む様々な文字がターゲットデバイス上で適切に扱われて再現されることを保証します。
- テキスト長のテスト：短い文字列から長い段落まで、異なる長さのテキストでテキスト転送機能をテストし、異なるテキストサイズを問題なく収容できるかを確認してください。
- エラー処理：接続の喪失やテキスト転送中の中断などのエラーシナリオをテストし、ホストアプリケーションがこれらの状況を適切に処理し、ユーザーに適切なフィードバックを提供することを確認します。
- パフォーマンステスト：古いまたは遅いコンピュータを含むさまざまな条件下でテキスト転送機能のパフォーマンスを評価し、HID入力信号の誤受信による潜在的な問題を特定し、操作がスムーズであることを保証してください。
- ユーザーインターフェースのテスト：ホストアプリケーションのユーザーインターフェースがテキスト転送操作の開始と監視のための直感的なコントロールとフィードバックを提供し、ユーザーがこの機能を効果的に理解し使いこなすことが容易になるようにします。

!!! 注意
    テキスト転送機能は、ターゲットコンピューターにテキスト内容を再現するためのタイピング動作をエミュレートするように設計されています。クリップボード統合をサポートしていないため、画像などの非テキストコンテンツの転送はできません。この機能はASCIIコードに基づいたテキストのみの転送をサポートしており、中国語、日本語、韓国語などのASCIIコードに基づかない言語はサポートしていません。また、一度に大量のテキストを転送することは推奨されません。

## BIOSレベルへのアクセス ⚙️
- アプリが異なるターゲットデバイスのBIOSにアクセスできるかどうか。

## 音声 🔊
- ターゲットコンピュータの音声が操作コンピュータで正常に再生されるかどうか。

## ビデオ 🎥
- アプリが異なる解像度と頻度でターゲットコンピュータを適切に表示できるかどうか。

## プラグとアンプラグ 🔌
- 推奨されるデバイス接続順序
- 上記の推奨に従って順序を崩し、異なるシナリオをテストして正常な操作を確認。

## 切り替え可能なUSBポートとそのトグルスイッチ 🔄
- トグルスイッチテスト: トグルスイッチが信頼性高く効率的に動作し、ホストコンピュータとターゲットコンピュータ間の接続を切り替えることができるかどうか、さまざまなシナリオでテストします。
- ポートの互換性: USB-A 2.0ポートが、フラッシュドライブやウェブカムなど、さまざまなUSBデバイスでホストおよびターゲットコンピュータとの接続を意図した通りにサポートしているか確認します。

!!! note

    一度に一つのコンピュータのみがポートを使用できます。フラッシュドライブがポートを使用している場合は、スイッチを切り替えて別のコンピュータへのポートの使用を切り替える前に、フラッシュドライブを取り外すようにしてください。

!!! warning
    このUSBポートは外部USBデバイスに5Vの電力を供給することができますが、供給可能な電力は約10Wと非常に限られています。GPU集約的なタスクを実行しているJetson Nanoなど、特定の外部デバイスを駆動するには不十分な場合があることに注意してください。

## 異なるターゲットデバイス 💻🎯
- macOS、Windows、Linux、Android、iOSなど、異なるバージョンのターゲットデバイスをテストします。

## 異なるホスト 💻👑
- 現在リリースされている内部テストソフトウェア（macOS、Windows、Linuxのサポートされるバージョンなど）をテストします。
- 異なるOSバージョンが対応するホストアプリを使用できるかどうかをテストします。

# 追加テスト
- ユーザーインターフェーステスト：ホストアプリケーションのユーザーインターフェースが直感的でユーザーフレンドリーであることを確認し、重要な機能や設定に簡単にアクセスできることを検証します。
- エラーハンドリングテスト：接続の中断やデバイスの故障など、予期しない状況からうまく回復できるようにエラーハンドリング機構をテストします。
- ドキュメントレビュー：ユーザーマニュアルおよびドキュメントを確認し、包括的で正確かつ理解しやすいことを確認します。設定、操作、トラブルシューティングのための明確な指示を提供します。
- パフォーマンステスト：さまざまなワークロードシナリオでミニKVMデバイスのパフォーマンスを評価し、必要なパフォーマンス基準を満たしており、運用中にシステムパフォーマンスが低下しないことを確認します。
- 安定性テスト：連続使用下でのミニKVMデバイスの安定性と信頼性を評価するために、ストレステストおよび長時間テストを実施します。
---
date: 2024-08-22
authors:
  - Openterface
categories:
  - 更新情報
---

# ハードルを乗り越えて：進捗報告と新しいタイムライン

皆さん、こんにちは。

お元気ですか？前回の更新からしばらく経ちましたね。Openterfaceの進捗について、すべてが順調とは言えませんが、いくつかの障害に直面し、納期が遅れることになりました。予想外の出来事でしたが、私たちはこれらの課題に真剣に取り組み、着実に進展しています。良いニュースもたくさんありますので、この投稿を通じて現状と今後の予定をお伝えします。この投稿は約7分で読めますので、詳細に入っていきましょう。

## 規制、製造、品質

製造を開始する前に、特にCE認証を含む必要な品質テストをクリアする必要がありました。私たちのツールキットにはMini-KVMだけでなく、いくつかのアクセサリーも含まれているため、各部品がCEテストを受ける必要がありました。これらのテストは予想以上に時間がかかりましたが（ケーブルが意外と厄介でした）、良いニュースは、Mini-KVMとそのすべての部品がCE認証を取得したことです！以下は、Mini-KVM、HDMIケーブル、オレンジのType-Cケーブル、黒の短いType-Cケーブル、VGA2HDMIケーブルの認証概要です。認証を取得したことで、製造スケジュールが確定し、現在、すべての部品が製造中です。

![240823-0](pic/240823-0.jpg)
*UKCAとCEの要件は、私たちの電子製品にとって同じであり、CEはRoHSの準拠もカバーしています。*

2週間前、私たちは製造業者の一つを訪れ、オレンジケーブルの品質管理についてラインマネージャーにトレーニングを行いました。現在、すべてのオレンジケーブルが製造され、私たちのスタジオの一角に保管されています。
![240823-1](pic/240823-1.jpg)
*ケビンとショーンが、オレンジケーブルがOpenterface Mini-KVMと適切に動作することを確認するためのテスト方法を説明していました。*

今週も同様の作業を行い、他の部品の生産前線で品質保証のトレーニングを行います。以下は追加のケーブルのサンプルです。
![240823-2](pic/240823-2.jpg)
*TechxArtisanのロゴが誇らしげに刻まれたHDMIケーブル、短いType-Cケーブル、VGA-to-HDMIケーブルのサンプルです。*

他の部品とMini-KVMが製造業者から到着するのを待っており、その時点で各部品の品質を再確認し、出荷前にスタジオで適切に梱包します。つまり、私たちのチームが品質を直接確認してから皆さんの手元に届くことになります。

## 出荷、潜在的な遅延、新しいETA

現在の不確実性は出荷プロセスにあります。いくつかの運送会社を調査した結果、倉庫を経由してCrowd Supplyの倉庫に到着するまでに追加の時間がかかることがわかりました。海上輸送か航空輸送かを選ぶかどうかをまだ検討中ですので、もう少しお待ちください。

税関の通関も予期せぬ遅延を引き起こす可能性があります。製品が米国のCrowd Supplyの倉庫に到着した後、各注文に基づいて1〜2週間で世界中に出荷されます。米国外の支援者の場合、個々の小包は目的国での国際配送と通関を経る必要があります。

現在の状況を考慮し、バッファ時間を追加しても、年内に配送を完了できると慎重に楽観視しています。新しいETAは1月中旬です。この変更によりご不便をおかけして申し訳ありませんが、ご支援とご理解に感謝いたします。

## 最終版ハードウェアV1.9

以前の[Reddit投稿](https://www.reddit.com/r/Openterface_miniKVM/comments/1e25pco/openterface_minikvm_v19_with_pins_for_more/)でもお知らせしたように、ハードウェアをV1.9にアップグレードすることを決定しました。これには、ハッカブルな拡張ピンのセットが含まれています。これはクラウドファンディングキャンペーンの当初の計画には含まれていませんでしたが、ハードウェアの可能性を大幅に拡張するものと信じています。

![240823-3](pic/240823-3.jpg)
*VCC、GND、Target D+、Target D-、Host D+、Host D-ピン—‘D’はUSBデータを意味します。*

主な動機の一つは、USBスイッチをソフトウェアレベルで切り替えられるようにすることでした。これはなぜ重要なのでしょうか？私たちのロードマップでは、将来的にVNCなどのKVM-over-IPソリューションをサポートすることを目指しています。ローカルKVM制御をVNCプロトコルと一致させ、ホストコンピュータを介してターゲットコンピュータをリモートで制御できるようにするというアイデアです。このようなリモートシナリオでは、特にホストとターゲット間でファイル転送が必要な場合、ユーザーがUSBポートを切り替える能力が重要です。

拡張ピンは、iPadOSとの統合、ATX制御、ネットワークブリッジング、オーディオバイパスなど、さらなる可能性を開きます。ここですべての詳細には触れませんが、Openterfaceコミュニティに参加してさらに議論していただければと思います。

このハードウェアのアップグレードにより、OpenterfaceソリューションをIP経由で動作させ、より高度な機能を追加しつつ、プラグアンドプレイのKVM-over-USBツールとしての基本的な強みを維持することができます。これは、未知のデータセンターなどの不確実なIT環境をナビゲートするITプロフェッショナルに最適です。

V1.9は内部の基本テストに合格し、すべての支援者に公式バージョンとして提供されることを報告できることを嬉しく思います。ただし、このハードウェアのアップグレードにはさらなるテストが必要であり、これらの拡張ピンに基づく開発は実験的であり、バグが発生する可能性があります。ここで皆さんの貢献が求められます。オープンソースコミュニティの皆さんと一緒にOpenterfaceを改善していくことを期待しています。

## ソフトウェアのさらなる更新

ソフトウェア面でもエキサイティングな進展があります。現在、**Openterface Androidアプリ**に取り組んでいます！スムーズなKVM制御、マウスの動き、クリックを実演する初期デモを示したこの[tweet](https://x.com/TechxArtisan/status/1825460088922071398)をチェックしてください。さらに多くの機能が追加される予定で、コードがもう少し磨かれたら、このアプリもGitHubリポジトリ[Openterface_Android](https://github.com/TechxArtisanStudio/Openterface_Android)でオープンソース化されます。
![240823-4](pic/240823-4.jpg)
*AndroidタブレットからLinuxコンピュータをKVM制御するために指先だけを使用しています。素晴らしいですね！*

QTバージョンには便利な更新がありました—[ホストからターゲットへのテキスト転送](https://x.com/TechxArtisan/status/1825919721960780131)が可能になりました！これで、この機能はmacOS、Windows、Linuxホストアプリでサポートされています。

さらに、楽しい機能を追加する予定です—[ターゲットコンピュータがスリープしないようにする自動マウス移動](https://x.com/TechxArtisan/status/1825471186668847241)。画面を跳ね回るピンポンボールにするか、クラシックなDVDスクリーンセーバー効果にするか？[tweet](https://x.com/TechxArtisan/status/1825470086800691459)で投票してコメントしてください😃

## パッケージデザイン、ラベリング、マニュアル

いくつかの重要な要素のバランスを見つけるために、[さまざまなモックアップとパッケージデザインを試しています](https://www.reddit.com/r/Openterface_miniKVM/comments/1elm4vq/almost_ready_to_finalize_our_package_design/)：

- 出荷中に製品とその部品を保護するのに十分な強度の材料を選択すること、
- ユーザーが一目で製品を理解できるような情報豊富なラベリングを作成すること、
- 規制に準拠すること、
- 視覚的に魅力的なパッケージを作成すること、
- そして可能な限りプラスチックの使用を最小限に抑えることで環境に優しいこと。

さらに、旧ツールキットバッグにいくつかの改善を加えました：

- より大きな収納スペース、
- スタイリッシュなオレンジのジッパー、
- 外装と内装の素材のアップグレード、
- そして非常に伸縮性のあるメッシュポケット。

この素材を選んだ理由は、予算に優しく、触り心地が良く、中のアイテムを保護するのに十分な耐久性があるからです。**きっと気に入っていただけると思います**。

![240823-5](pic/240823-5.jpg)

アルミニウムケースのラベルも更新して、情報豊富で視覚的に魅力的なものにする予定です。これらの改善がユーザーエクスペリエンスを向上させ、Openterfaceの使用をより簡単にすることを願っています。

![240823-6](pic/240823-6.jpg)

Openterfaceマニュアルも更新中で、英語、ドイツ語、フランス語、日本語、中国語で提供される予定です。お使いの言語が含まれていない場合は申し訳ありません—私たちの箱はTARDISサイズ（ドクター・フーの警察ボックス）ではありません！しかし、ウェブサイトでさらに多くの翻訳を追加するよう努めます。

![240823-7](pic/240823-7.jpg)

## コミュニティ言語レビュー

翻訳にはChatGPTを使用していますが、時々表現や言い回しがうまくいかないことがあります。印刷物の最終化を控えているため、他の言語のコンテンツをレビューしていただけると非常に助かります。すべてのテキストコンテンツをGitHubフォルダ[product-printed-materials](https://github.com/TechxArtisanStudio/Openterface/tree/main/product-printed-materials)に更新しましたので、レビューして改善点を提出してください。直接DMでも構いません。ありがとうございます！

## 最後の言葉と進行中の進捗

遅延と製品のETAの変更について再度お詫び申し上げます。ご理解とご支援に感謝いたします—できるだけ早くお届けできるよう努力しています！出荷が手配され次第、すぐに更新いたします。さらなる更新が続きますので、Openterfaceコミュニティに参加してお待ちください！

よろしくお願いします、

ビリー・ワン  
プロダクトマネージャー  
Openterfaceチーム | TechxArtisan
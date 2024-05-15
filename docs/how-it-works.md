---
comments: true
---

# 仕組み

## プロセスの詳細

- **スクリーンストリーミング**: ミニKVMはターゲットコンピュータからの画面ストリームをキャプチャし、ホストコンピュータのアプリに表示します。これにより、ユーザーはホストマシンから直接ターゲットシステムを閲覧および管理できます。
- **カーソルとマウスの制御**: ホストコンピュータのアプリウィンドウにマウスを移動することで、ユーザーはVNCを使用しているかのようにターゲットデバイスのカーソルを制御できます。この機能により、1つの画面で2つのシステムを同時に操作できます。
- **キーボード入力**: アプリウィンドウがアクティブな場合、ホストコンピュータのキーボードで行われた任意のキーストロークがターゲットデバイスに送信され、シームレスなタイピングとコマンド入力が可能になります。
- **HIDシグナル変換**: アプリ内のすべてのキーボードおよびマウス入力は、ヒューマンインターフェースデバイス（HID）制御シグナルに変換され、その後ターゲットコンピュータに送信されます。
- **同期**: アプリはターゲットコンピュータの画面とカーソルがホストコンピュータのディスプレイと同期することを保証し、統一されたユーザーエクスペリエンスを実現します。

## ハードウェアの詳細を探る

- [Openterface_Mini-KVM_Hardware](https://github.com/TechxArtisan/Openterface_Mini-KVM_Hardware): 当社の包括的なハードウェアデザイン、回路図、およびコンポーネントを探索してください。

![openterface-mini-kvm-product-with-PCB](/images/product/openterface-mini-kvm-product-with-PCB.jpg)

<section class="dialogue-section-white" id="dialogues-section">
    <div class="container">
        <div class="callout-button-container">
            <div class="dialogue-bubble" id="op-bubble">
                <img src="/images/op-avatar.jpg" alt="アバター" class="avatar" draggable="false">
                <p>詳細を読む 📖</p>
                <a href="/faq" class="md-button md-button--primary" id="join-waitlist-button">FAQ</a>
            </div>
            <div class="dialogue-bubble" id="op-bubble">
                <img src="/images/op-avatar.jpg" alt="アバター" class="avatar" draggable="false">
                <p>質問？🤔</p>
                <a href="https://www.reddit.com/r/Openterface_miniKVM/" class="md-button md-button--primary" id="join-waitlist-button">Subredditで尋ねる</a>
            </div>
        </div>
    </div>
</section>
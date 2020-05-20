---
date: 2020-05-20 01:28
description: Bản tin Swift Việt Nam #1
tags: news
---

# Bản tin Swift #1

Xin chào mừng các bạn đến số đầu tiên của **"Bản tin Swift"**. Tự giới thiệu mình tên là An, hiện đang làm iOS Engineer ở Đức. Tại **"Bản tin Swift"** mình sẽ tổng hợp các thông tin mới nhất liên quan đến ngôn ngữ lập trình Swift, về Apple ecosystem và về các vấn đề liên quan đến phát triển ứng dụng cho Apple platforms. 

Có nhiều lý do tại sao mình lại bắt đầu **"Bản tin Swift"**:

- Mình viết Swift hàng ngày, cả ở công việc lẫn hobby :)
- Mình thích Swift và thường xuyên đọc nhiều thông tin về Swift.
- Mình thích viết app cho Apple platforms.
- Mình muốn chia sẻ kiến thức và thông tin mình cập nhật được với nhiều người.
- Minh muốn kết nối cộng đồng lập trình viên iOS Việt Nam để chúng ta có thể chia sẻ thông tin, cơ hội làm việc cũng như cùng nhau phát triển.

Các bạn có thẻ truy cập trang web chính của **"Bản tin Swift"** tại: [https://swiftvietnam.com](https://swiftvietnam.com)

# Tin tức

## Swift 5.3 có gì mới?

Anh bạn [Paul Hudson](https://twitter.com/twostraws) có tổng hợp những Swift Evolution đã được implemented trong phiên bản [Swift 5.3](https://swift.org/blog/5-3-release-process/). Các bạn có thể xem [tại đây](https://www.whatsnewinswift.com/?from=5.2&to=5.3) để biết thêm chi tiết. Các bạn cũng có thể tải [playground](https://www.whatsnewinswift.com/files/playground-5-2-to-5-3.playground.zip) này xuống để xem trực tiếp code.

Mình tóm lược các Swift Evolution đã được cập nhật trong Swift 5.3:

- [SE-0276](https://github.com/apple/swift-evolution/blob/master/proposals/0276-multi-pattern-catch-clauses.md) Multi-pattern catch clauses: bắt nhiều exceptions trong cùng một lúc.
- [SE-0279](https://github.com/apple/swift-evolution/blob/master/proposals/0279-multiple-trailing-closures.md) Multiple trailing closures: cái SE này bị cộng đồng chỉ trích khá nhiều vì chẳng có ích mấy mà còn làm code khó đọc hơn. Nhưng mình dự đoán là Apple sẽ giới thiệu 1 cái gì đó ở WWDC mà cái SE sẽ makes sense.
- [SE-0266](https://github.com/apple/swift-evolution/blob/master/proposals/0266-synthesized-comparable-for-enumerations.md) Synthesized Comparable conformance for enums: so sánh các case trong một enum nếu enum conform to `Comparable`
- [SE-0269](https://github.com/apple/swift-evolution/blob/master/proposals/0269-implicit-self-explicit-capture.md) `self` is no longer required in many places: bớt phải viết `self` nếu Compiler có thể đảm bảo là không thể có reference cycle. Đặc biệt hữu dụng khi dùng `SwiftUI` hay `Combine`
- [SE-0281](https://github.com/apple/swift-evolution/blob/master/proposals/0281-main-attribute.md) Type-Based Program Entry Points
- [SE-0267](https://github.com/apple/swift-evolution/blob/master/proposals/0267-where-on-contextually-generic.md) `where` clauses on contextually generic declarations
- [SE-0270](https://github.com/apple/swift-evolution/blob/master/proposals/0270-rangeset-and-collection-operations.md) New collection methods on noncontiguous elements
- [SE-0268](https://github.com/apple/swift-evolution/blob/master/proposals/0268-didset-semantics.md) Refined didSet Semantics
- [SE-0277](https://github.com/apple/swift-evolution/blob/master/proposals/0277-float16.md) A new Float16 type
- [SE-0271](https://github.com/apple/swift-evolution/blob/master/proposals/0271-package-manager-resources.md) Swift Package Manager gains binary dependencies, resources, and more: Cái này rất hay vì chúng ta sẽ có thể sử dụng được SPM cho các packge có chứa ảnh, âm thanh, JSON, plist hay bất cứ resource nào khác. Trước đây SPM chỉ hỗ trợ package chứa code thôi
- [SE-0272](https://github.com/apple/swift-evolution/blob/master/proposals/0272-swiftpm-binary-dependencies.md) Package Manager Binary Dependencies : yay, Google có thể sử dụng SPM để package Firebase được rồi.
- [SE-0273](https://github.com/apple/swift-evolution/blob/master/proposals/0273-swiftpm-conditional-target-dependencies.md) Package Manager Conditional Target Dependencies: sử dụng các package khác nhau phụ thuộc vào platform.

Đặc biệt là Swift 5.3 sẽ chính thức hỗ trợ Windows và một số [distro Linux khác](https://swift.org/blog/additional-linux-distros/) (hiện chỉ hỗ trợ chính thức Ubuntu). Mình đã dùng Swift 5.2 để tạo  [SwiftVietnam](https://swiftvietnam.com) trên Linux Ubuntu. Mình có viết về trải nghiệm của mình [tại đây](https://swiftvietnam.com/posts/2020-19-04_use_publish_to_create_static_websites/).

## Lan truyền lỗi giữa các tầng trong cấu trúc của ứng dụng bằng Swift

Anh bạn [John Sundell](https://twitter.com/johnsundell) thảo luận về việc propagate lỗi trong các tầng thấp lên tầng trên trong cấu trúc ứng dụng. John cũng giới thiệu kỹ thuật dung `enum` để group các lỗi cùng loại cho dễ xử lỹ.

Các bạn có thể đọc thêm chi tết [tại đây](https://www.swiftbysundell.com/articles/propagating-user-facing-errors-in-swift/)

# Video - Audio

## CS193p - Developing Apps for iOS

Khoá học phát triển ứng dụng iOS nổi tiếng của trường đại học Standford hiện đang được làm mới và sử dụng SwiftUI 100%. Khoá học này hoàn toàn miễn phí, chỉ tiếc là không có chứng chỉ cho những ai không phải là sinh viên của Standford 😔.

Các bạn có thể xem video của khoá học trên Youtube. Link được cập nhật tại đây: [https://cs193p.sites.stanford.edu/](https://cs193p.sites.stanford.edu/)

## App Builders 2020

[App Builder](https://appbuilders.ch/) là một conference về phát triển ứng dụng được tổ chức ở Thuỵ Sĩ. Conference này khá nổi tiếng ở Châu Âu và thường mời được rất nhiều Speakers có uy tín về thuyết trình. Năm nay vì Covid-19 nên họ tổ chức online và videos đã được cập nhật trên Youtube.

Các bạn xem chi tiết [tại đây](https://www.youtube.com/watch?v=LpHah3oQeyg&list=PLLcE3DL3f5ByDAucPjzNRG_hPtYDvYlIA) 

## Podcast: Polymorphic interfaces	

Trong podcast gần đây, John Sundell có phỏng vấn Dave Abrahams, một trong những người tạo ra ngôn ngữ Swift, về "Lập trình hướng Protocol - Protocol-Oriented Programming".

Nếu bạn chưa biết **Dave Abrahams** là ai hay không biết "Protocol-Oriented Programming" là gì, mình recommend các bạn xem lại video [Protocol-Oriented Programming in Swift](https://developer.apple.com/videos/play/wwdc2015/408/) từ WWDC 2015

Quay lại Podcast của giữ John và Dave, họ thảo luận khá nhiều về tại sao Swift lại không đi theo hướng đối tượng, C++ có ảnh hưởng thế nào đến Swift, Generic Programming là gì và đặc biệt là tại sao Dave không còn làm việc ở Apple nữa.

Các bạn có thể nghe podcast [tại đây](https://www.swiftbysundell.com/podcast/71/)

# Thư viện - Mã nguồn

## The Composable Architecture:

Nếu các bạn muốn phát triên ứng dụng scalable và maintainable, chắc chắc các bạn sẽ nghĩ đến việc chia nhỏ ứng dụng của mình thành các thành phần bé hơn. Các anh bạn ở Pointfree.co mới phát hành một cấu trúc có tên là [The Compossable Architecture](https://github.com/pointfreeco/swift-composable-architecture) (TCA) một vài tuần trước giúp các bạn có thể xây dựng ứng dung (SwiftUI và UIKit) theo cách lắp ghép các thành phần nhỏ lại với nhau. 

Trên [Pointfree.co](https://www.pointfree.co/) các bạn có thể theo dõi 3 videos gần nhất để xem họ giới thiệu về TCA nhé.

Đặc biệt nếu bạn muốn học thêm về Functional Programming và xem các video (mất tiền) bổ ích khác trên Pointfree.co, đặc biệt là các bạn ở Việt Nam, các bạn có thể xem mình có được [áp dụng giảm giá](https://www.pointfree.co/subscribe/personal?useRegionalDiscount=true) không nhé. Điều kiện là bạn trả tiền bằng thẻ tín dụng issued ở Việt Nam.

## ACHNBrowserUI

Mình không chơi Animal Crossing nhưng thấy rất nhiều người đang điên cuồng vì trò chơi này. Nếu bạn đang chơi trò này và muốn học SwiftUI, Combine thì bạn có thể tham khảo cái App [ACHNBrowserUI](https://github.com/Dimillian/ACHNBrowserUI) này nhé. Mã mở hoàn toàn. App được viết bởi anh chàng [Thomas Ricouard](https://github.com/Dimillian), người đã gây bão trong cộng đồng Swift vì là một trong những người viết [ứng dụng bằng SwiftUI đầu tiên](https://github.com/Dimillian/MovieSwiftUI).

# Tools:

## Concurrent Carthage

Chắc mọi người đã biết và dùng `Carthage` để quản lý thử viện bên thứ ba cho ứng dụng của mình. Nếu bạn để ý thì `Carthage` khá là chậm nếu bạn có nhiều dependency. [Concurrent Carthage](https://github.com/unchartedworks/ConcurrentCarthage) là một công cụ mới dùng để giúp `Carthage` sử dụng tối đang các core trên máy tính để tăng tốc.

# Apple

## Apple Glass

Anh chàng John Prosser, một leaker về các sản phẩm của Apple khá nổi tiếng, vừa phát hành một video lean về Apple Glass trên [Youtube](https://www.youtube.com/watch?v=SfjSy6T4iE4)
Apple đầu tư khá nhiều vào AR mấy năm gần đây. Mình sống ở Munich , Đức và là nơi Apple đã [mua một công ty AR](https://techcrunch.com/2015/05/28/apple-metaio/), khởi nguồn cho ARKit và các công nghệ AR của Apple. Mình có dùng một số AR apps trên điện thoại, thực ra cũng không thấy hay lắm. Cái Apple Glass chắc chắn thích hợp cho việc sử dụng app AR hơn là điện thoại.

Tiện nói về AR, mình có xem [cái demo này](https://arcopypaste.app/) rất cool 😉.

# Vui

Các bạn có biết chữ `NS` (ví dụ trong `NSObject`) viết tắt cho cái gì không?

Đáp án [ở đây](https://twitter.com/manicakes/status/1259851414622425092) nhé 😉

# Lời cuối

Puh, viết một bài tổng hợp cũng không phải đơn giản. Bây giờ là hơn 1h đêm rồi mà mình vẫn không biết bài viết có đủ thông tin hay ho cho mọi người không. Nhưng giờ thì mệt quá rồi nên mình xin ngừng ~~bút~~ phím ở đây. Hy vọng "Bản Tin Swift" số #1 mang lại cho các bạn một số thông tin hữu ích về cộng đồng Swift thế giới.

Mình rất muốn tìm và chia sẻ các thông tin về iOS/Apple/Swift với các bạn lập trình viên Việt Nam. Nếu bạn có ý kiến, ý tưởng, chỉ trích hay đóng góp gì cho bài viết, các bạn có thể liên lạc với mình trên [Twitter](https://twitter.com/antranapp) hoặc [Github](https://github.com/antranapp). Rất mong nhận được ý kiến đóng góp của các bạn.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về ~~Taylor~~ Swift nhé 😋.

Chào thân ái.
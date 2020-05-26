---
date: 2020-05-27 01:28
description: Bản tin Swift Việt Nam #2
tags: news
---

# Bản tin Swift Việt Nam #2

Mở đầu xin cảm ơn sự khích lệ của các bạn cho ["Bản tin Swift #1"](https://swiftvietnam.com/posts/2020-05-20_ban_tin_swift_vietnam_so_1). Mình rất vui vì bài viết đưa lại một số thông tin bổ ích cho các bạn. Mình muốn nhấn mạnh 1 lần nữa là mình muốn xây dựng [Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) thành một cộng đồng mạnh để lập trình viện Swift Việt Nam có thể khẳng định mình với bạn bè thế giới. "Bản tin Swift" là một trong những project để tiến tới mục tiêu đó. Mình rất mong muốn có thêm sự đóng góp của những ai tâm huyết với dự án này. Toàn bộ mã nguồn trang web [https://swiftvietnam.com](https://swiftvietnam.com) được hosted tại [Github](https://github.com/SwiftVietnam/SwiftVietnam). Mình sử dụng Github Issues để tổng hợp [thông tin cho bài viết này](https://github.com/SwiftVietnam/SwiftVietnam/issues/1). 

# Tin Tức

## Swift 5.2.4

Swift 5.2.4 đã được phát hành vào ngày 20.5. Ngoài việc hỗ trợ Xcode 11.5 cho MacOS, phiên bản này hỗ trợ thêm các Linux distro mới như CentOS 8, Amazon Linux 2.

Các bạn xem thêm chi tiết [tại đây](https://swift.org/download/#releases)

## Tiến tới Swift 5.3

Trong [bản tin #1](https://swiftvietnam.com/posts/2020-05-20_ban_tin_swift_vietnam_so_1/), mình đã giới thiệu các tính năng mới sẽ có mặt trong phiên bản Swift tiếp theo. Trên trang blog Swift.org, chúng ta có thể xem chi tiết [quy trình phát hành của Swift 5.3](https://swift.org/blog/5-3-release-process/). Nếu không có gì bất ngờ, mình dự đoán phiên bản Swift 5.3 sẽ được phát hành cùng với Xcode 12 và iOS 14 sau WWDC20.

## [SE-0283] Tuples Conform to `Equatable`, `Comparable`, and `Hashable` được chấp nhận.

[`SE-0283`](https://github.com/apple/swift-evolution/blob/master/proposals/0283-tuples-are-equatable-comparable-hashable.md) đã được chấp nhận và sẽ được tích hợp vào phiên bản Swift tiếp theo trong tương lại. Cái SE này sẽ giúp bạn tiết kiệm được rất nhiều boilerplate code khi sử dụng Tuple và muốn conform `Equatable`, `Comparable`, hay `Hashable` bởi vì Swift sẽ tự động infer nếu tất cả các types sử dụng trong tuple conforms với `Equatable`, `Comparable`, hay `Hashable` thì Tuple sẽ tự động conforms với các protocol này, rất hữu ích 👍. 

# Bài viết 

## Mã nguồn app Telegram

Ở VN dùng nhiều Zalo nhưng mình sống ở Đức nơi mọi người rất chú ý vấn đề bảo mật nên app [Telegram](https://telegram.org/) cũng khá phổ biến. App này [mã nguồn mở trên github](https://github.com/TelegramMessenger/Telegram-iOS) để mọi người có thể audit tính bảo mật. Thế nhưng với hơn 200 modules và hơn 2 triệu dòng code, việc đọc hiểu mã nguồn không phải là việc đơn giản. Rất may bạn [Bo Hu](https://medium.com/@BoHu) trên Medium có làm một serie bài viết walk through mã nguồn của app Telegram. Bài viết rất đáng tham khảo nếu các bạn muốn biết cách cấu trúc mã nguồn và xây dựng kiến trúc cho một ứng dụng lớn. Mời các bạn tham khảo [phần 1](https://medium.com/@BoHu/source-code-walkthrough-of-telegram-ios-part-1-adee673e2202), [phần 2](https://medium.com/@BoHu/source-code-walkthrough-of-telegram-ios-part-2-ssignalkit-afdf35ff60ba), [phần 3](https://medium.com/@BoHu/source-code-walkthrough-of-telegram-ios-part-3-other-foundations-66ace05954a4) của series này.

# Mã nguồn

## Bow Arch

Trong [Bản tin Swift Việt Nam số #1](https://swiftvietnam.com/posts/2020-05-20_ban_tin_swift_vietnam_so_1/) mình có giới thiệu kiến trúc mã nguồn mở [The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture). Đây là một kiến trúc uni-directional (kiểu Redux - React) thích hợp dùng để xây dựng ứng dụng lớn bằng cách chia nhỏ nó ra thành các component nhỏ hơn. Tình cờ trong tuần vừa rồi các bạn bên [bow-swift](https://bow-swift.io) cũng giới thiệu một kiến trúc uni-directional tương tự như TCA có tên là [bow-arch](https://github.com/bow-swift/bow-arch). Bow Arch được xây dựng dựa trên thư viện [Functional Programming Bow](https://github.com/bow-swift/bow), được xây dựng dựa trên các [nguyên tắc](https://github.com/bow-swift/bow-arch#-principles):

- 🎨 View as a function of state
- 🚧 Clear separation of concernsecific concern, and lets us separate how our code deals with different aspects of - application development.
- 📦 Modularity
- ✅ Testability
- 🧩 Highly polymorphic
- 🧮 Mathematical background

Mình chưa có cơ hội để thử nghiệm kiến trúc này. Nếu bạn nào đã thử làm việc với kiến trúc này và muốn chia sẻ kinh nghiệm với cộng đồng thì [liên lạc với mình](https://twitter.com/antranapp) nhé. Chi tiết về Bow Arch, các bạn có thể xem trên [trang chủ](https://arch.bow-swift.io/).

## Nuke 9.0

Chắc hẳn mọi người ai cũng đã từng phải tải ảnh hoặc video từ remote servers và lưu lại cho các lần sử dụng sau trong ứng dụng của mình. [Kingfisher](https://github.com/onevcat/Kingfisher) là thư viện khá nổi tiếng và phổ biến cho tác nghiệp này. Thế nhưng tuần này Kingfisher đã có một đối thủ đáng gờm, đó là thư viện Nuke, phát triển bởi [Alexander Grebenyuk](https://twitter.com/a_grebenyuk). Với phiên bản [9.0](https://kean.github.io/post/nuke-9) (phiên bản này được phát triển trong 5 năm 🤯), Nuke hỗ trợ SwiftUI và Combine, có nhiều API mới, hỗ trợ nhiều định dạng ảnh mới, decode và process ảnh nhanh hơn etc.. Mọi thông tin chi tiết các bạn tham khảo trên [trang chủ của dự án](https://kean.github.io/nuke) hoặc tham khảo [mã nguồn](https://github.com/kean/Nuke) nhé.

## CombinePlaygrounds - Using Combine.

Sắp WWDC20 rồi, Apple chắc chắn sẽ có nhưng nâng cấp đáng kể cho [SwiftUI](https://developer.apple.com/documentation/swiftui) và [Combine](https://developer.apple.com/documentation/combine) frameworks. Nếu bạn nào vẫn chưa có ý định học về SwiftUI và Combine thì có lẽ các bạn nên bắt đầu từ bây giờ. Mình tin rằng các dự án apps trong tương lại sẽ chủ yếu được xây dựng bằng 2 công nghệ này. Nếu bạn nào đã từng sử dụng các thử viện như [RxSwift](https://github.com/ReactiveX/RxSwift) hay [ReactiveSwift](https://github.com/ReactiveCocoa/ReactiveSwift) thì việc học Combine cũng hiểu [Reactive Programming](http://reactivex.io/) sẽ đơn giản hơn. Nhưng nếu bạn chưa có nhiều kinh nghiệm với Reactive Programming thì việc hiểu các concept về xử lý dòng dữ liệu cũng như high-order functions không phải là chuyện một sớm một chiều. Anh bạn [Denis Poifol](https://twitter.com/DenisPoifol) có làm một playground để giới thiệu về Combine [tại đây](https://github.com/denisPoifol/CombinePlaygrounds). Đọc code trên Playgrounds sẽ giúp bạn vừa hiểu về lý thuyết, lại vừa nhìn được code nên sẽ dễ tiếp thu được kiến thức hơn. Sau khi đọc xong cái Playgrounds trên và nắm được kiến thức cơ bản về Combine, mình recommend các bạn đọc tiếp trang [Using Combine](https://heckj.github.io/swiftui-notes/) để tìm hiểu sau hơn nữa về Combine.

# Video

## Machine Learning meets iOS

Machine Learning đang là một mảng phát triển rất mạnh, đặc biết là ở trên các thiết bị cuối như iPhone, iPad khi mà khả năng xử lý của các thiết bị này ngày càng tăng. Có nhiều cách để ứng dụng Machine Learning trên iOS, nhưng cách phổ biến nhất là sử dụng [CoreML](https://developer.apple.com/documentation/coreml). Anh [Minh Nguyễn](http://atoapps.com/), Senior iOS Developer  của công ty [boot.AI](https://boot.AI) có trình bày trong video ["Machine Learning meets iOS"](https://www.facebook.com/bootAI.RD.Center/videos/170997990820962) những ứng dụng cơ bản của CoreML cũng như 1 use case đo nhiệt độ cơ thể thông qua xử lý ảnh (rất quan trọng trong thời dịch Covid-19 :)). Các bạn có thể theo dõi video [tại đây](https://www.facebook.com/bootAI.RD.Center/videos/170997990820962).

## CS193p - Developing Apps for iOS

Hai videos tiếp theo của serie [học lập trình iOS với SwiftUI](https://cs193p.sites.stanford.edu/) của trường đại học Stanford đã được cập nhật trên Youtube.

- [Reactive UI Protocols Layout](https://www.youtube.com/watch?v=SIYdYpPXil4)
- [Grid enum Optionals](https://www.youtube.com/watch?v=eHEeWzFP6O4)


## Apps for All: Making Software Accessible

Ngày 21.05.2020 vừa rồi là ngày "Global Accessibility Awareness Day" (mình chả biết dịch cái này sang tiếng Việt thế nào cho đúng 🤷‍♂️). Ý tưởng là khuyến các nhà phát triển các ứng dụng điện tử (apps, website, electronic devices etc... ) hãy để ý đến cả những người bị tàn tật hoặc khó tiếp cận các sản phẩm này hơn những người dùng bình thường khác. Chủ đề này có lẽ không phổ biến ở Việt Nam, nhưng ở Châu Âu và ở Mỹ, các yêu cầu này khá quan trọng. Mình đã từng phải ngồi hàng tuần đề test cái app của công ty bằng cách bịt mắt chỉ nghe voice over và sử dụng app để hoàn thiện phần accessiblity. Apple cũng cung cấp rất nhiều [API](https://developer.apple.com/accessibility/) và tutorials trong app [Apple Developer](https://apps.apple.com/de/app/apple-developer/id640199958) cho tác vụ này. Anh bạn [Matthew Bischoff](https://www.youtube.com/user/magicpop) có [một video rất hay](https://www.youtube.com/watch?v=LHHmx5XxIBc) về chủ đề này, mới các bạn tham khảo nhé.

# Soft Skills

Đa số lập trình viên như chúng ta thường thích viết code hơn là đi nói chuyện với người hoặc làm các công việc không liên quan đến code. Rất tiếc là để làm được một ứng dụng nhiều người yêu thích và sử dụng bây giờ, chúng ta cần đầu tư vào nhiều skills khác nhau nữa như thiết kế, quản lý dự án, marketing etc.. Mình sẽ giới thiệu một số bài viết liên quan đến chủ đề này tại đây để các bạn tham khảo.

## Building a Design System for iOS

Nếu các bạn làm việc ở các công ty lớn một chút, họ sẽ có đội ngũ thiết kế riêng và thường học sẽ có một Design System để sử dụng cho các sản phẩm của mình. Ví dụ như AirBnB, học có cả [một trang web chuyên về ngôn ngữ thiết kế](https://airbnb.design/) của riêng mình. Các bạn chắc hẳn sẽ thắc mắc, vậy Design System là gì, làm sao để lập trình viên như chúng ta có thể hiểu và thậm chí tự tạo cho mình một design system riêng, làm sao chúng ta có thể biên dịch cái design system này từ Photoshop, Sketch, Figma hay bất kỳ một chương trình thiết kế nào sang Swift. Anh bạn [Ram Shandilya](https://www.ramshandilya.com/) tuần vừa rồi có một series bài viết giới thiệu về Design System khá hay và dễ hiểu. Các bạn có thể tham khảo từ [phần 1](https://www.ramshandilya.com/blog/design-system-intro/) nhé. Các bạn cũng có thể tham khảo thêm [video này](https://www.youtube.com/watch?v=Fvq8PQKJj_k&t=1053s) để xem một cách tiếp cận Design System bằng Swift tương tự nhé.

# Apple

## iOS 13.5

Tuần vừa rồi Apple đã phát hành phiên bản iOS 13.5, nhận diện khẩu trang, nhưng quan trọng nhất là [Exposure Notification Framework](https://developer.apple.com/documentation/exposurenotification) dành cho các app contact tracing phòng chống Covid-19. Apple thậm chí còn phát hành [mã nguồn](https://developer.apple.com/documentation/exposurenotification/building_an_app_to_notify_users_of_covid-19_exposure) một ứng dụng mẫu sử dụng ENF.

Về mặt kỹ thuật, nguyên tắc ENF hoạt động tương đối giống các app contract tracing phát hanh trước dây như tracetogether của Singapore hoặc bluezone của Việt Nam: trao đổi anonymized IDs qua giao thức bluetooth giữa các máy tiếp xúc gần nhau. Nhưng với việc ENF được tích hợp trực tiếp vào hệ thống, các app sử dụng không phải luôn luôn mở ở foreground nữa mà có thể hoạt động ở background. Ngoải ra ENF cũng tương thích với một framework tương tự bên Android. Mình thấy việc Apple và Google bắt tay nhau phát triển ENF là một điều tuyệt vời, giúp giảm thiểu việc có quá nhiều protocols được phát triển độc lập không tương thích với nhau. Với việc là official framework của iOS và Android, người dùng cũng sẽ tin tưởng hơn và sẽ sử dụng các apps contract tracing nhiều hơn, dẫn đến nâng cao hiệu quả của việc chống dịch.

## Uncover Jailbreak

Rất lâu rồi mình không jailbreak iPhone của mình nữa vì mình cũng không còn thời gian nghịch ngợm các Tweaks trên Cydia nữa. Nhưng gần đây có, cộng động Jailbreak lại dậy sóng vì tool [unc0ver](https://unc0ver.dev/) có phát hiện ra lỗ hổng nào đó mà có thể jailbreak các phiên bản iOS từ iOS 11.0 đến 13.5. 

Nói chung việc jailbreak hay không thì mỗi người có một ý kiến riêng. Bản thân mình sẽ không tọc mạch cái jailbreak này vì có nhiều thông tin các nhân trên điện thoại và mình không muốn bypass các security machanism của iOS khiến cho các thông tin cá nhân đó có thể bị lấy mất. 

Ở Việt Nam mọi người thì chủ yếu jailbreak để dùng app chùa. Thế nhưng cũng có một số "ích lợi" khác cho việc jailbreak là dùng các Tweaks để nâng cấp một số tính năng cho iOS mà bạn không thể làm được nếu không jailbreak. Anh bạn [Peter Steinberger](https://twitter.com/steipete) có bài viết tổng hợp pros và cons của việc jailbreak cũng như hướng dẫn jailbreak sử dụng tool unc0ver [tại đây](https://steipete.wtf/posts/jailbreaking-for-ios-developers/).

## iOS 14

Chỉ còn chưa đến 1 tháng nữa là đến WWDC và gần như chắc chắn Apple sẽ giới thiệu iOS 14 với nhiều tính năng mới tại hội nghị này. Tuy nhiên những phiên bản đầu tiền của iOS 14 hiện đã bị leak ra ngoài và rất nhiều hacker và security researchers đang bắt đầu nghiên cứu tìm lỗ hổng của phiên bản iOS mới này. [Vice](https://www.vice.com/en_us/article/5dzpxz/how-iphone-hackers-got-hands-on-new-ios-14-months-before-realease) có bài phân tích khá hay về thị trường đen buôn bán trao đổi các thông tin leak về các hệ điều hành của Apple. 

Bên [9to5mac](https://www.macrumors.com/2020/05/21/airpods-pro-assembled-vietnam/) cũng có tổng hợp các thông tin về phiên bản iOS 14 để các bạn tham khảo.

# Công cụ

## Piranha

Nếu các bạn đã từng làm feature flags, A/B Testings trong app của mình, chắc hẳn các bạn sẽ phải đi dọn dẹp các code thừa sau khi thí nghiệm A/B Testing thực hiện xong hoặc feature được rollout cho toàn bộ users của mình. Thường thì công việc này khá nhàm chán (ai lại thích đi xoá code đâu) nên rất nhiều teams lười cứ để code chết ở trong projects của mình. Thế nhưng nếu các bạn kỹ sư của Uber cũng lười như vậy thì chắc project của họ với hơn [6000 feature flags](https://www.infoq.com/news/2020/04/uber-piranha-unreachable-code/) sẽ trở thành một mớ hỗn độn mất. Có lẽ chính vì thế mà Uber đã giới thiệu tool [Piranha](https://github.com/uber/piranha) để hỗ trợ việc dọn dẹp các feature flags trong ứng dụng của mình. Giải thích đơn giản là bạn nhập tên của flag và expected behaviours, Piranha sẽ nghiêm cứu cấu trúc của mã nguồn và nhận biết các pattern liên quan đến cái feature flag đó và thay đổi và dọn dẹp các code không cần thiết cho chúng ta. Hy vọng sau đó projects của chúng ta vẫn dịch được và các tests đều mầu xanh :). Các bạn tham khảo thêm về Piranha tại [bài giới thiệu](https://eng.uber.com/piranha/) hoặc tham khảo trực tiếp [mã nguồn](https://github.com/uber/piranha) nhé.

# Vui

Các bạn thấy có giống nhau không 😆

![swift_communism](https://github.com/SwiftVietnam/SwiftVietnam/blob/master/Output/Images/swiftvietnam/swift_communism.jpeg?raw=true)

# Lời cuối

Chỉ còn vài tuần nữa là WWDC20 sẽ diễn ra với rất nhiều thông tin liên quan đến Swift và Apple Ecosystem. Nếu các bạn hoặc công ty các bạn có sự kiện gì liên quan đến WWDC20 và muốn thông tin đến cộng đồng lập trình viên Swift, các bạn có thể liên lạc với mình qua [twitter](https://twitter.com/antranapp), hoặc [Github](https://github.com/antranapp), hoặc trực tiếp trên [trang Github của Swift Việt Nam](https://github.com/SwiftVietnam/SwiftVietnam), mình sẽ thông báo tin tức đấy vào bản tin Swift Việt Nam tiếp theo.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.

Links:
- Mã nguồn bài viết: [https://github.com/SwiftVietnam/SwiftVietnam/blob/master/Content/posts/2020-05-27_ban_tin_swift_vietnam_so_2.md](https://github.com/SwiftVietnam/SwiftVietnam/blob/master/Content/posts/2020-05-27_ban_tin_swift_vietnam_so_2.md)
- Tổng hợp thông tin có bài số #3: [https://github.com/SwiftVietnam/SwiftVietnam/issues/2](https://github.com/SwiftVietnam/SwiftVietnam/issues/2)
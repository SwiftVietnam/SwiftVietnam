---
date: 2020-10-12 08:21
description: Bản tin Swift Việt Nam #10
tags: news
---

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/swiftvietnam_10.png)

# Bản tin Swift Việt Nam #10

Bài viết này đánh dấu bài viết thứ 10 cho bản tin Swift. Mình rất cảm ơn mọi người đã ủng hộ cho các bài viết trước. Mình hiện có một số ý tưởng để nâng cao chất lượng cho các bài viết trong tương lại, các bạn đón chờ nhé.

Điểm qua tin tức tuần vừa rồi: các phiên bản Beta 4 cho Xcode, iOS, iPadOS, tvOS, watchOS và macOS đã được phát hành. Apple tiếp tục mang một số tính năng mới trong các phiên bản beta mới này. Một thông tin thú vị là Swift cũng đã tròn 10 tuổi. 

# Swift:

## Swift 10 tuổi

Swift được giới thiệu tới cộng đồng Apple Developer trong WWDC 2014, nhưng Chris Lattner đã phát triển Swift từ trước đó lâu rồi, với cái tên là "Shiny". Tuần vừa rồi, anh Chris đã thông báo sự kiện [trên Twiter](https://twitter.com/clattner_llvm/status/1284156940747042817), đánh dấu 10 năm kể từ [commit đầu tiên](https://github.com/apple/swift/commit/18844bc65229786b96b89a9fc7739c0fc897905e) vào dự án Swift.

Nếu các bạn muốn tìm hiểu thêm về lịch sử phát triển Swift, mình recommend các bạn xem video anh Paul Hudson phỏng vấn Chris Latter [tại đây](https://www.youtube.com/watch?v=OAaQhW4ifu0) nhé.

## Swiftʼs Collection Types

[Collection Types](https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html), bao gồm Array, Set, Dictionary là các kiểu ứng dụng cơ bản có trong Swift Standard Library. Hiểu về các kiểu dữ liệu này có vai trò quan trọng trông việc chọn kiểu dữ liệu thích hợp cho data models. Các kiểu dữ liệu collection này thường conform một số protocol nhất định. Bạn Harshil có một bài viết giải thích khá cặn kẽ các protocol cơ bản liên quan đến Collection Types trong Swift. Các bạn tham khảo bài viết [ở đây nhé]
(https://harshil.net/blog/swift-sequence-collection-array).

## What's new in Swift 5.3 podcast

John Sundell thảo luận cùng với anh JP Simard về các tính năng mới trong Swift 5.3 được giới thiệu trong WWDC 2020 trong [podcast mới nhất](https://www.swiftbysundell.com/podcast/78/). Các bạn cũng có thể xem lại overview những điểm mới trong Swift trên [WWDC video này](https://developer.apple.com/videos/play/wwdc2020/10170/), hoặc trên trang web [What's new in Swift?](https://www.whatsnewinswift.com/?from=5.2&to=5.3)

## Kitura trở thành một dự án cộng đồng

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/kitura.png)

Nếu các bạn theo dõi Swift on Server thì chắc đã biết là IBM đã từ bỏ phát triển tiếp Kitura từ năm ngoái. Hiện chỉ còn Vapor là dự án open source, vẫn đang được phát triển tiếp để deploy Swift như một ngôn ngữ server-side. IBM vừa thông báo tuần vừa rồi là họ sẽ chuyển quyền sở hữu Kitura cho cộng đồng. Như vậy chúng ta sẽ có thêm nhiều framework để lựa chọn hơn khi muốn sử dụng Swift trên server. Thông tin chi tiết [tại đây](https://forums.swift.org/t/kitura-is-now-a-community-project/39199).

# Bài viết:

## Kiểm tra tính xác thực của App bằng DeviceCheck và Attest API

Nếu bạn phát triển các ứng dụng thương mại, hoặc có In-App-Purchase và hoặc muốn chống lại các hình thức hack để truy cập vào những tính năng premium của app, hoặc ngăn chặn app chạy trên các thiết bị bị jailbroken, các bạn có thể sử dụng [framework DeviceCheck](https://developer.apple.com/documentation/devicecheck) miễn phí của Apple để kiểm tra tính xác thực của app của mình trên device của users. Việc kiểm tra này đảm bảo là phiên bản app của bạn trên thiết bị của user không bị chỉnh sửa hay decompile. Trong iOS 14, Apple đã cập nhật framework DeviceCheck này, [bổ xung thêm Attest API](https://developer.apple.com/news/?id=2sngpulc) để tăng tính bảo mật cho việc kiểm tra tính xác thực của ứng dụng.

Để hiểu thêm Attest API này hoạt động thế nào, các bạn có thể tham khảo [bài viết này](https://macsecurity.net/view/409-apple-is-stepping-up-app-verification-through-new-app-attest-api).

Các bạn cũng có thể tham khảo chi tiết cách sử dụng Attest API tại [bài viết này](https://swiftrocks.com/app-attest-apple-protect-ios-jailbreak).

## Xây dựng ứng dụng đa nền tảng bằng SwiftUI

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/hackernews.png)

Một trong những cải tiến mới nhất trong SwiftUI ở WWDC 2020 là việc hỗ trợ phát triển các app đa nền tảng. Về lý thuyết, chúng ta có thể sử dụng cùng 1 codebase để xây dựng ứng dụng cho tất cả các nền tảng của Apple. Trang fritz.ai có giới thiệu một bài viết hướng dẫn xây dựng một client cho trang [HackerNews](https://news.ycombinator.com/) cho iOS, iPadOS và macOS cùng một lúc dựa trên một codebase duy nhất. Các bạn tham khảo [bài viết tại đây nhé](https://heartbeat.fritz.ai/building-a-multi-platform-app-with-swiftui-5336bce94689).

## Kiến trúc giống Redux cho SwiftUI

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/redux.png)

Nếu các bạn đã từ làm việc với ReactJS, chắc hẳn các bạn đã quen với kiến trúc Redux để quản lý state của web app. Với việc SwiftUI hoạt động khá giống ReactJS, chúng ta cũng có thể kết hợp kiến trúc này với SwiftUI để quản lý state cho iOS apps. Anh bạn Daniel Bernal có một series bài viết để hướng dẫn bạn sử dụng một kiến trúc kiểu Redux trong ứng dụng iOS viết bằng SwiftUI. Các bạn có thể tham khảo các phần bài viết tại đây:
- [Basics](https://danielbernal.co/redux-like-architecture-with-swiftui-basics/)
- [Side Effects](https://danielbernal.co/redux-like-architecture-with-swiftui-middleware)
- [Error Handling](https://danielbernal.co/redux-like-architecture-with-swiftui-error-handling/)

Anh bạn [Majid](https://swiftwithmajid.com/) cũng có một series bài viết tương tự:
- [Basics](https://swiftwithmajid.com/2019/09/18/redux-like-state-container-in-swiftui/)
- [Best practices](https://swiftwithmajid.com/2019/09/25/redux-like-state-container-in-swiftui-part2/)
- [Container Views](https://swiftwithmajid.com/2019/10/02/redux-like-state-container-in-swiftui-part3/)

## Self-Sizing UITableView Cells with SwiftUI

Bài viết của bạn Noah Gilmore khá thú vị khi bạn đó đã tìm hiểu cách tích hợp một `SwiftUI View` vào làm content cho một `UITableViewCell`. Thách thức ở đây là làm sao chúng ta có thể kết hợp `SwiftUI` và `UITableViewCell` để hiển thị dữ liệu động, các cell không có chiều cao cố định. Các bạn tham khảo bài [phân tích tại đây nhé](https://noahgilmore.com/blog/swiftui-self-sizing-cells/).

## Step-by-step guide for localizing plurals in iOS

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/plural.png)

Nếu các bạn đã từng xây dựng các ứng dụng có giao diện tiếng anh, chắc hẳn các bạn đã từng gặp vấn đề với việc phải hỗ trợ các danh từ số ít, số nhiều trong tiếng anh tuỳ thuộc vào ngữ cảnh, ví dụ như nếu bạn phải thiết kế một `UILabel` có title là "x day(s)" thì tuỳ thuộc vào `x = 1` hay `x > 1`, các bạn sẽ phải sử dụng `day` hoặc `days`. Rất may Apple có hỗ trợ việc localizing plurals này trực tiếp trong Xcode. Các bạn có thể xem hướng dẫn từng bước việc sử dụng plurals localization tại [bài viết này nhé](https://www.tanaschita.com/posts/20200801-plurals-localization-in-ios/).  

# Mã nguồn:

## SwiftDB

Nếu bạn sử dụng CoreData với SwiftUI, các bạn có thể sử dụng [SwiftDB](https://github.com/vmanot/SwiftDB) để đơn giản hoá việc tích hợp giữa CoreData và SwiftUI. SwiftDB cung cấp nhiều Property Wrappers liên quan đến CoreData để giảm thiểu các boilerplate code liên quan đến CoreData, giúp cho việc sử dụng CoreData với SwiftUI đơn giản hơn.

# Tool

## IndieApps - Airport Community

![10](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/10/airport.png)

Có rất nhiều iOS app hay hiện được tác giả của họ phát hành trên Testflight. Việt tìm và phát hiện các app này khá khó khăn vì Apple không có một App Store nào dành cho Testflight app. Mình cũng có một ý tưởng tạo ra một Testflight App Store và có phát triển một ứng dụng nguồn mở có tên là [IndieApps](https://antranapp.github.io/IndieApps/). Tình cờ anh bạn [Jordan Singer](https://twitter.com/jsngr) cũng phát triển một ứng dụng tương tự có tên là [Airport](https://airport.community/). Các bạn có thể sử dụng các platforms này để dùng thử các app iOS mới hoặc để tìm tester cho các ứng dụng của chính bản thân mình nhé. 

# Lời kết:

Mình hiện đã relocated về Singapore, gần về địa lý với Việt Nam hơn và cũng gần múi giờ ở Việt Nam hơn nên sẽ có nhiều điều kiện để trao đổi với các bạn yêu thích Swift ở Việt Nam hơn.

Nếu các bạn có các bài viết liên quan đến Swift, WWDC và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
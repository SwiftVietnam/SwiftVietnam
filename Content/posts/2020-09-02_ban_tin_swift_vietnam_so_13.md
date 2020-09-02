---
date: 2020-09-02 08:21
description: Bản tin Swift Việt Nam #13
tags: news
---

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/swiftvietnam_13.png)

# Bản tin Swift Việt Nam #13

Apple tuần vừa rồi tung ra bản iOS 14 beta 6 và rất bất ngờ với phiên bản đầu tiên của iOS 13.7 beta.

Cuộc chiến giữa Epic Games và Apple tiếp tục leo thang khi Apple đã [chính thức xoá tài khoản](https://mjtsai.com/blog/2020/08/28/apple-terminates-epic-games-developer-account/) developer phát hành game Fornite và các tựa đề khác của Epic Games khỏi hệ thống. Apple có vẻ muốn chữa cháy mấy phốt gần đây liên quan đến quá trình kiểm tra ứng dụng nên đã đươc ra [thông tin mới](https://developer.apple.com/news/?id=84w3e5bm) về những thay đổi của App Store cũng như khuyến khích mọi người [đóng góp ý kiến](https://developer.apple.com/contact/app-store/?topic=guideline) về quá trình kiểm tra app trước khi lên App Store.

Hiện cộng đồng Swift Việt Nam đang chuẩn bị một hướng dẫn chi tiết cách xây dựng một ứng dụng băng SwiftUI từ lúc ý tưởng cho đến lúc phát hành lên App Store. Hiện mình đang thu thập ý kiến về serie hướng dẫn này trên group của Swift Việt Nam, mời các bạn [tham gia đóng góp ý kiến nhé](https://www.facebook.com/groups/691941251234927).

# Swift:

## Thông tin Swift Evolution Proposals

- Chấp nhận:
    - [SE-0287](https://github.com/apple/swift-evolution/blob/master/proposals/0287-implicit-member-chains.md): Extend implicit member syntax to cover chains of member references
- Review:
    - [SE-0288](https://github.com/apple/swift-evolution/blob/master/proposals/0288-binaryinteger-ispower.md): Adding isPower(of:) to BinaryInteger

## Reimplement protocol conformance cache with a hash table

Đọc qua thông tin trong cái [Pull Request này](https://github.com/apple/swift/pull/33487) mình có 2 suy nghĩ:
- Rất vui vì Swift Compiler sẽ chạy nhanh hơn nếu code base có nhiều protocols
- Ai định xin vào làm cho Apple thì xác định luôn là cầy thuật toán nhiều vào 😝. 

# Bài viết:

## Sử dụng Vision Framework để track tay và body pose

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/handtracking.png)

Với việc các vi xử lý trên điện thoại ngày càng mạnh, cũng như các framework hỗ trợ xử lý Machine Learing ngay trên thiết bị như CoreML ngày càng phổ biến và dễ dùng, chúng ta sẽ ngày càng thấy nhiều ứng dụng Machine Learning chạy trực thiết trên điện thoại thông minh của mình. [Bài viết này](https://orangeloops.com/2020/08/hand-tracking-body-pose-detection-with-vision-framework) có giới thiệu về Vision Framework của Apple dùng để track tay và body pose, tất cả đều được xử lý ngay trên thiết bị mà không cần kết nối với bất kỳ máy chủ nào.

## Sử dụng Core Data để cache dữ liệu từ Internet

Core Data được sử dụng để lưu trữ và truy cứu dữ liệu trên thiết bị. Caching là kỹ thuật lưu tạm dữ liệu trích xuất từ internet để chúng ta giảm tần suất kết nối với internet cho ứng dụng hoặc cung cấp dữ liệu cho người dùng khi offline. [Bài viết này](https://www.donnywals.com/implementing-a-one-way-sync-strategy-with-core-data-urlsession-and-combine/) của Donny Wals có giới thiệu kỹ thuật sync dữ liệu vào Core Data sử dụng `URLSession` và `Combine`.

## Sử dụng hàm như một biến phụ thuộc

Đa phần chúng ta đã quen với việc sử dụng Protocol để định nghĩa một biến phụ thuộc và inject protocol này vào ứng dụng. Tuy nhiên việc sử dụng protocol để định nghĩa biến phụ thuộc có nhược điểm là chúng ta phải định nghĩa những biến phục thuộc này rất sớm trong lifecycle của ứng dụng ngay cả khi chung ta không dùng chúng ngay lập tức. [Bài viết này](https://itnext.io/functions-as-dependencies-in-swift-2bc382f9475d) có giới thiệu một kỹ thuật sử dụng high-order function để định nghĩa biến phụ thuộc và khởi tạo chúng một cách lazy. Mời các bạn tham khảo nhé.

# Mã nguồn:

## SwiftIO - sử dụng Swift trên vi xử lý

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/swiftio.png)

[SwiftIO](https://github.com/madmachineio/SwiftIO) là một dự án nguồn mở nhằm mục đích đưa ngôn ngữ Swift lên vi xử lý, ví dụ như dòng Cortex processors. Nôm na là chúng ta có thể lập trình các board tương tự Arduino bằng ngôn ngữ Swift. Hiện dự án mới hỗ trợ một [board duy nhất](https://www.madmachine.io/product-page/swiftio) nhưng mình tin trong tương lai cũng ta sẽ thấy nhiều dòng sản phẩm phần cứng hỗ trợ SwiftiO.

## Tokamak - Sử dụng Swift để xây dựng ứng dụng Web

Mình xin giới thiệu các bạn dự án [Tomarak](https://github.com/TokamakUI/Tokamak), sử dụng Swift để xây dựng ứng dụng Web.

Tokamak sử dụng SwiftWasm để biên dịch mã Swift sang WebAssembly để hiện thị trên trình duyệt.

Chúng ta có thể thấy ngôn ngữ Swift rất linh hoạt và có thể sử dụng ở nhiều ứng dụng khác nhau chứ không phải chỉ gói gọn trong Apple ecosystems.

## Debug trong SwiftUI

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/debugging_swiftui.png)

Với việc SwiftUI sử dụng Function Bulder khắp mọi nơi, chúng ta không dễ dàng có thể sử dụng `print` để debug ứng dụng của mình. Anh bạn John Sundell có [đề xuất một số giải pháp](https://www.swiftbysundell.com/articles/building-swiftui-debugging-utilities) cho việc sử dụng `print` để debug ứng dụng SwiftUI bằng cách viết và sử dụng một số hàm debugging riêng.

## Thư viện kiến trúc luồng dữ liệu một chiều Workflow

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/unidirectional.png)

[Workflow](https://github.com/square/workflow-swift) là một thư viện mới, được phát triển bởi Square, dùng để tạo kiến trúc cho ứng dụng với các ưu điểm:
- Sử dụng State Machine để thay đổi UI và Navigation
- Composition và Scaling
- Tách biệt giữa code cho business logic và UI.

Đặc biệt là thư viện này có cả phiên bản [viết bằng Kotlin](https://github.com/square/workflow-kotlin), hỗ trợ Android. Điều này giúp cho việc chia sử cấu trúc giữa Android và iOS app dễ dàng hơn.

Các bạn có thể xem qua bài giới thiệu về Workflow tại [video này](https://player.vimeo.com/video/362741019)

# Tool:

## snip - Quản lý snippets

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/snips.png)

Dự án mã mở "Snip" là một phần mềm chạy trên macOS dùng để quản lý các mẩu code thường dùng trên macOS. Toàn bộ mã nguồn được viết bằng SwiftUI và Combine, hỗ trợ syntax highlight hơn 100 ngôn ngữ khác nhau, hỗ trợ viết bằng Markdown và HTML và nhiều tính năng khác, mời các bạn tham khảo.

# Tips & Tricks:

## Navigation trong Xcode 12

Xcode 12 có rất nhiều sự thay đổi trong việc quản lý tabs. Bạn có thể [tham khảo bài viết này](https://samwize.com/2020/08/21/navigating-xcode-12-and-tabs) để xem cách sử dụng các phím tắt đề navigate giữa các file source

## Markdown Playgrounds for Swift

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/markdown_playgrounds.png)

[Markdown Playgrounds](https://github.com/objcio/markdown-playgrounds) là một ứng dụng nguồn mở, được phát triển bời [objc.io](https://www.objc.io/). Markdown Playgrounds hoạt động tương tự như Swift Playground, hoạt động đơn giản hơn và chúng ta không cần phải sử dụng Xcode cồng kềnh chỉ để thử nghiệm code Swift.

# Giới thiệu ứng dụng

## Not Phở by [@linhbouniol](https://twitter.com/linhbouniol)

![13](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/13/notpho.gif)

Not phở là một ứng dụng mới phát hình của bạn [@linhbouniol](https://twitter.com/linhbouniol). Mục đích của ứng dụng là giới thiệu những món ăn Việt Nam khác, ngoài Phở với tất cả các bạn bè quốc tế. Ngoài việc nội dung rất hay, ứng dụng cũng có những hiệu ứng chuyển động được làm rất tỉ mỉ.

Các bạn có thể tải "Not Phở" [tại đây nhé](https://apps.apple.com/app/apple-store/id1525104124).

# Hài hước:

Không ngờ có cả một câu chuyện drama đằng sau [cái meme nổi này](https://twitter.com/skepholic/status/1296865027941478400?s=20) 😭🤣.

# Lời kết:

Từ số này mình có bổ sung thêm mục Tips & Trick cũng như mục giới thiệu ứng dụng của lập trình viên người Việt. Nếu các bạn có thông tin gì hay muốn giới thiệu app iOS của mình đến mọi người thì có thể gửi một issue lên [repo của Swift Việt Nam](https://github.com/SwiftVietnam/SwiftVietnam) nhé.

Nếu các bạn có các bài viết liên quan đến Swift, WWDC, lập trình iOS và các platform khác của Apple muốn chia sẻ với cộng động thì các bạn [tham gia nhóm thảo luận Swift Việt Nam](https://www.facebook.com/groups/691941251234927) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
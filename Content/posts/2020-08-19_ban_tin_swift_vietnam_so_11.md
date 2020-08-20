---
date: 2020-08-19 08:21
description: Bản tin Swift Việt Nam #11
tags: news
---

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/swiftvietnam_11.png)

# Bản tin Swift Việt Nam #11

Có lẽ tin tức nổi bật nhất liên quan đến Apple trong tuần vừa rồi là cuộc chiến pháp lý giữa Apple và Epic games, nhà phát hành trò chơi Fortnite nổi tiếng. Vấn đề liên quan đến việc Apple bắt buộc mọi nhà phát hành trên Apple Store chỉ được sử dụng In-App-Purchases để bán nội dụng trong apps, Apple sẽ lấy 30% giá bán. Epic games thấy việc đó là không hợp lý và cho người dùng mua tiền ảo trong game Fortnite bằng cách trả tiền trực tiếp bằng thẻ tín dụng. Apple ngay sau đó đã xoá game Fortnite khỏi Apple Store và doạ đóng tài khoản phát hành của Epic Games. Epic Games cũng đáp trả lại bằng cách kiện Apple độc quyền. Cuộc chiến pháp lý này chắc chắn sẽ ảnh hưởng rất nhiều đến tương lại của Apple App Store, dù cho ai thắng ai thua đi nữa. Mình không có bình luận gì cho việc này vì mình thấy pros và cons của cả 2 bên. 

# Swift:

## Bài phỏng vấn anh Chris Lattner về máy học

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/chris.png)

Anh Chris Lattner, cha đẻ của ngôn ngữ Swift, đã từng làm việc 2 năm ở Google cho dự án liên quan đến máy học [Swift for Tensorflow](https://www.tensorflow.org/swift). Mới đây anh Chris có một bài phỏng vấn về mối liên hệ giữa ngôn ngữ lập trình, trình compiler và máy học. Nếu các bạn có hứng thú với chủ đề khá hóc búa này, mời các bạn xem video bài phỏng vấn [tại đây](https://www.youtube.com/watch?v=QeG9bdkc3Lk) nhé.

## Sử dụng Swift với AWS Lambda

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/aws_lambda.png)

Trong số #, mình có giới thiệu về việc AWS Lambda đã hỗ trợ Swift. Trong số này, mình giới thiệu với các bạn [bài viết chi tiết](https://fabianfett.de/swift-on-aws-lambda-creating-your-first-http-endpoint) để tạo ra một HTTP Endpoint bằng Swift chạy trên AWS Lambda.

# Bài viết:

## Feather CMS

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/feather.png)

Nếu các bạn chán sử dụng Swift để viết apps rồi thì các bạn có thể bắt đầu tìm hiểu Server Side Swift, sử dụng Swift như một ngôn ngữ lập trình cho máy chủ. Vapor có lẽ là thư viện phổ biến nhất để tạo các ứng dụng máy chủ bằng Swift hiện nay. Feather CMS là một content management system được xây dựng dựa trên Vapor 4.0 để tạo các trang web quản lý nội dung. Các bạn có thể đọc bài giới thiệu về Feather tại [website của tác giả](https://theswiftdev.com/getting-started-with-feather-cms/) nhé.

## Quản lý kết nối internet cho iOS apps

Chúng ta chắc ai cũng đã từng vò đầu bứt tai làm phần networking cho apps của mình. Logic để kiểm tra khả năng kết nối của thiết bị với internet rất phức tạp và đòi hỏi lập trình viên phải rất cẩn thận. Mình xin giới thiệu [bài viết này](https://www.vadimbulavin.com/network-connectivity-on-ios-with-swift/) có tổng hợp các best practices cho việc xử lý việc kiểm tra kết nối internet cho iOS app.

## Tinh chỉnh iOS Simulator

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/simulator.png)

Similator cung cấp bởi Xcode là một công cụ không thể thiếu trong quá trình làm apps. Xcode có cung cấp lệnh `simctl` để điều khiển các simulator từ dòng lệnh. Có rất nhiều công cụ được xây dựng dựa trên `simctl` để giúp ích cho việc tương tác với simulator. Thông tin cụ thể về `simctl` các bạn có thể xem chi tiết trong [WWDC video: Become a Simulator expert](https://developer.apple.com/videos/play/wwdc2020/10647/).

Bài viết [Hacking iOS Simulator with simctl and dynamic libraries](https://curvedlayer.com/2020/08/09/ios-simulator-plugin-simctl.html) cung cấp một số hacks nâng cao để giúp chúng ta inject code vào simulator và thay đổi các thành phần hệ thống của Simulator, ví dụ như homescreen của simulator (còn gọi là SpringBoard).

# Mã nguồn:

## Parma - hiển thị Markdown bằng SwiftUI

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/parma.jpg)

[Parma](https://github.com/dasautoooo/Parma) là một thư viện mới được phát hành dùng để xử lý và hiển thị Markdown bằng các components của SwiftUI. [Markdown](https://en.wikipedia.org/wiki/Markdown) là một markup-language rất phổ biến để viết formatted texts, được sử dụng rất nhiều ví dụ trên [Github](https://guides.github.com/features/mastering-markdown/).

## SwiftUI-Introspect - tinh chỉnh SwiftUI

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/introspect.png)

Một trong những điểm mạnh của SwiftUI là với chỉ một vài dòng code, chúng ta có thể dễ dàng xây dựng được các giao diện phức tạp. Tuy nhiên đây cũng là điểm yếu của SwiftUI khi chúng ta muốn tinh chỉnh một số thành phần UI của SwiftUI vì Apple không cho lập trình viên can thiệp sâu vào các thành phần bên trong của SwiftUI. Rất may, nhờ có thư viện [SwiftUI-Introspect](https://github.com/siteline/SwiftUI-Introspect), chúng ta có thể khám xét cấu trúc giao diện của app trong runtime, và tinh chỉnh các thành phần giao diện như chúng ta mong muốn. Điểm yếu là thư viện này là nó phụ thuộc vào cách Apple xây dựng các components cho SwiftUI, và điều này có thể thay đổi trong mỗi phiên bản SwiftUI khác nhau, thế nên các bạn nên cẩn thận khi sử dụng SwiftUI-Instropect trong apps của mình.

## swift-doc - tạo documentation cho các dự án Swift

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/swiftdoc.png)

Viết documentation cho code là công việc cần thiết, đặc biết nếu chúng ta làm việc trong nhóm hoặc chia sẻ code với mọi người. Hiên [jazzy](https://github.com/realm/jazzy) là công cụ rất phổ biến để tạo documentation cho các mã nguồn trên Apple platform. Anh bạn [Mattt](https://nshipster.com/) có tạo ra một thư viện mới để tạo documentation cho các dự án Swift, có tên là swift-doc: https://github.com/SwiftDocOrg/swift-doc. `swift-doc` có khả năng tạo HTML hoặc Markdown documents, dễ dàng cho việc phát hành lên web.

## ToggleUI - Feature Toggle cho SwiftUI

[ToggleUI](https://github.com/ilyapuchka/ToggleUI) là một thư viện mới giúp cho việc quản lý feature toggles cho các dự án SwiftUI một cách dễ dàng. Điểm mạnh của thư viện này là sử dụng Property Wrapper, giúp cho việc sử dụng các feature flags dễ dàng như một biến boolean, cùng với việc tự động tạo debug UI, giúp cho việc bật/tắt và debug các features dễ dàng hơn.

# Tool:

## CheatSheet - tìm nhanh phím tắt

![11](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/11/cheatsheet.png)

[CheatSheet](https://mediaatelier.com/CheatSheet/) là một phần mềm miễn phí cho Mac để tìm nhanh các phím tắt cho tất cả các apps. Bạn chỉ ấn phím `⌘` khi đang sử dùng bất kỳ app nào trên Mac, một bảng danh sách sẽ hiện lên với hiển thị tất cả các phím tắt trong app hiện tại, rất thuận tiện cho việc sử dụng bàn phím thay vị chuyển sang dùng chuột.

# Hài hước:

Nếu bạn có ý định [debug Swift compiler](https://twitter.com/aalonso128/status/1293418352023613440) 😨

# Lời kết:

Mình hiện đã relocated về Singapore, gần về địa lý với Việt Nam hơn và cũng gần múi giờ ở Việt Nam hơn nên sẽ có nhiều điều kiện để trao đổi với các bạn yêu thích Swift ở Việt Nam hơn.

Nếu các bạn có các bài viết liên quan đến Swift, WWDC, lập trình iOS và các platform khác của Apple muốn chia sẻ với cộng động thì các bạn [tham gia nhóm thảo luận Swift Việt Nam](https://www.facebook.com/groups/691941251234927) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
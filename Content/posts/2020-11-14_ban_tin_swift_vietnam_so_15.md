---
date: 2020-11-14 08:21
description: Bản tin Swift Việt Nam #15
tags: news
---

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/swiftvietnam.png)

# Bản tin Swift Việt Nam #15

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/ios14.png)

Bạn có biết là tính đến thời điểm hiện tại đã có nhiều thiết bị chạy iOS 14 hơn iOS 13 🤯

Ứng dụng của bạn đã hỗ trợ iOS 14 tốt chưa, bây giờ là thời điểm thích hợp để kiểm tra điều đó trước khi quá muộn đấy 😬

Tham khảo Realtime iOS 14 adaption [tại đây](https://mixpanel.com/trends/#report/ios_14).

# Swift:

## Swift Algorithms

**Giới thiệu package Swift Algorithms**

Swift Algorithms tập hợp các thuật toán liên quan đến các kiểu dữ liệu thích hợp với protocol Sequence hay Colleection

Nếu các bạn đã từng xem Video ["Embrace Algorithms"](https://developer.apple.com/videos/play/wwdc2018/223/) ở WWDC 2018 , chắc hẳn các bạn sẽ thấy tầm quan trọng của việc sử dụng đúng thuật toán để giải quyết vấn đề trong lập trình.

Các thuật toán trong phiên bản hiện thời gồm có:
- Combinations
- Permutations
- Product
- Chunked
- Chain
- Cycle
- Unique
- Random Sampling
- Indexed
- Partition
- Rotate

Các bạn xem giới thiệu chi tiết về [Swift Algorithms](https://swift.org/blog/swift-algorithms/) trên trang Swift.org. 

## Swift Atomics

**Giới thiệu package Swift Atomics ⚛️**

Các bạn nào ngày xưa còn sử dụng Objective-C chắc vẫn nhớ atomic với nonatomic properties. Atomic chủ yếu được sử dụng trong môi trương multi-threading, khi nhiều threads cùng truy cập vào một biến.

Các biến trong Swift được định nghĩa non-atomic by default.

Tuy nhiên, mới đây Apple đã giới thiệu một package mã mở có tên Swift Atomics. Package này giúp chúng ta có thể xây dựng các low-level atomic operation trực tiếp bằng Swift.

Các bạn đọc thêm chi tiết về package Swift Atomics [ở đây](https://swift.org/blog/swift-atomics/).

## Swift on Windows

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/windows.png)

**Swift đã chính thức hỗ trợ Windows**

Sau khi hỗ trợ Linux, Swift đã chính thức hỗ trợ Windows. Như vậy chúng ta có thể sử dụng Windows PC để chạy các ứng dụng viết bằng Swift, cũng như viết mã Swift trực tiếp. 

Hy vọng Apple cũng sẽ sớm đưa Xcode lên Windows để tiện cho việc viết Code.

Hướng dẫn chi tiết về việc cài đặt Swift trên Windows tại đây:

- 📖 [Swift getting started](https://swift.org/getting-started/#installing-swift)
- 🎦 [Swift on Windows](https://www.youtube.com/watch?v=rKN60MoqGn8)

# Bài viết:

## Các app sẽ hiện thị như thế nào trên màn hình iPhone 12

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/iphone12_resolution.png)

Vậy là Apple đã giới thiệu hàng loạt iPhone mới 🤩. Lần này anh em chúng ta còn chả có bản Xcode GM mới để test thử ứng dụng trước khi iPhone được bán. Thế nên chắc chắn nhiều app sẽ không kịp cập nhật phiên bản mới để hỗ trợ tương thích cho các iPhone 12 mới.

Chắc hẳn các bạn sẽ thắc mắc, các app hiện đã có trên App Store được xậy dựng bằng các Xcode phiên bản cũ thì sẽ hiển thị ra sao trên màn hình iPhone 12?

Các bạn có thể tham khảo [bài viết sau](https://hacknicity.medium.com/how-ios-apps-adapt-to-the-various-iphone-12-screen-sizes-e45c021e1b8b) để xem cách Apple scale ứng dụng cũ để hiện thị trên màn hình iPhone 12 nhé.

## Home Screen Quick Actions with SwiftUI

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/quickaction.jpg)

Với việc giới thiệu phương thức mới để quản lý lifecyle cho ứng dụng SwiftUI từ Xcode 12, chúng ta sẽ không còn AppDelegate dể thực hiện một số tác vụ như khởi tạo các delegate để xử lý Home Screen Quick Action.

Bài viết [sau đây](https://medium.com/@jeevat13/home-screen-quick-actions-swiftui-2-0-75d9ceac27c1) sẽ giới thiệu với các bạn cách thức xử lý Home Screen Quick Action trong SwiftUI 2.0:

## SwiftUI 2.0: The magic of redacted modifier

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/redacted.png)

Redacted modifier là một tính năng mới rất hay trong SwiftUI 2.0. Nếu ai dùng ứng dụng Facebook thì bạn sẽ thấy khi mới mở ứng dụng, trong lúc các bài viết trên feed đang tải về, bạn sẽ thấy feed của bạn ở loading state đã có cấu trúc như kiểu là đã được tải xong rồi, chỉ có phần chữ là chưa hiện lên.

Trong SwiftUI 2.0, chúng ta chỉ cần cung cấp cấu trúc View, SwiftUI sẽ tự động phân tích và cung cấp một phiên bản redacted cho chúng ta sử dụng trong loading state, rất thuận tiện.

Bạn có thể tham khảo bài viết sau để biết thêm chi tiết cách thức hoạt động của redacted modifier [tại đây](https://swiftwithmajid.com/2020/10/22/the-magic-of-redacted-modifier-in-swiftui/). 

## Test code không đồng bộ bằng Busy Assertion Pattern

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/assertion.png)

Trong một ứng dụng iOS, chúng ta có rất nhiều đoạn có chạy không đồng bộ, như code tải dữ liệu từ mạng, code xử lý các tác vụ nặng, vân vân ... Việc kiểm thử các đoạn code này thường được làm bằng cách sử dụng expectation để chờ cho các tác vụ không đồng bộ thực hiện xong.

Busy Assertion Pattern là một pattern khá hay để chúng ta đồng bộ hoá việc kiểm thử các đoạn code không đồng bộ.

Các bạn có thể đọc chi tiết về pattern này [tại đây](https://www.vadimbulavin.com/swift-asynchronous-unit-testing-with-busy-assertion-pattern/).

# Mã nguồn:

## SwiftUI Camera

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/camera.png)

Việc SwiftUI hỗ trợ sử dụng các thành phần của UIKit nên việc tích hợp Camera vào SwiftUI không phải là việc quá khó. Tuy nhiên việc sử dụng AVFoundation để hỗ trợ tuỳ biến Camera trong SwiftUI là một tác vụ khá mới mà không phải lập trình viên nào cũng có thể hiểu ngay được.

Mình giới thiệu các bạn một series bài viết miêu tả rất chi tiết việc tích hợp Camera, sử dụng AVFoundation trong một SwiftUI. Các bạn tham khảo [tại đây](https://github.com/rorodriguez116/SwiftCamera).

# Tool:

## Bagel:

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/bagel.png)

iOS Networking debugger

Bạn nào đã từng sử dụng Charles Proxy để debug network code trên iOS chắc cũng biết là chúng ta phải cài đặt nhiều Certificates rồi chỉnh sửa nhiều configurations như thế nào trước khi có thể nhìn thấy các networking traffic hiện lên trên Charles.

Mình giới thiệu các bạn một công cụ khác có tên là Bagel. Với công cụ nay, bạn sẽ embed một library nhỏ vào ứng dụng iOS của mình và sử dụng một app trên máy Mac để xem networking traffic. Rất thuận tiện trong việc tìm lỗi liên quan đến Networking.

Các bạn xem thêm chi tiết về Bagel [tại đây](https://github.com/yagiz/Bagel) nhé. 

## Lookin:

![15](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/15/lookin.jpg)

**Ứng dụng debugging giao diện cho iOS Apps miễn phí và nguồn mở**

Ai dùng Xcode chắc đã quen với việc sử dung UI Inspector để kiểm tra và debug giao diện ứng dụng iOS apps.

Ngoài ra có một công cụ khác khá nổi tiếng cho việc nay là [Reveal](https://revealapp.com).

Mình xin giới thiệu với các bạn một công cụ miễn phí, nguồn mở khác phục vụ cho việc debug views, rất hữu ích khi phát triển giao diện cho ứng dụng iOS có tên là Lookin:

- 👉 Trang chủ: [https://lookin.work](https://lookin.work)
- 👉 Mã nguồn: [https://github.com/QMUI/LookinServer](https://github.com/QMUI/LookinServer)

# Tips & Tricks:

## Swift Tips videos

Bạn [Vincent Pradeilles](https://twitter.com/v_pradeilles) này là một chuyên gia về Swift người Pháp. Mình đã có dịp gặp bạn này ở một hội thảo ở Sing và rất ngưỡng mộ về kiến thức của bạn này.

Bạn Vicent vừa mới bắt đầu một kênh youtube về các tips trong Swift rất hay, mời các bạn tham khảo [tại đây](https://www.youtube.com/channel/UCjkoQk5fOk6lH-shlm53vlw/videos)

# Lời kết:

Nếu các bạn có các bài viết liên quan đến Swift, lập trình iOS và các platform khác của Apple muốn chia sẻ với cộng động thì các bạn [tham gia nhóm thảo luận Swift Việt Nam](https://www.facebook.com/groups/691941251234927) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
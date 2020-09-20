---
date: 2020-09-21 08:21
description: Bản tin Swift Việt Nam #14
tags: news
---

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/swiftvietnam.png)

# Bản tin Swift Việt Nam #14

Sự kiện đáng chú ý nhất trong 2 tuần vừa rồi có lẽ là [sự kiện Apple Event ngày 15/9](https://www.apple.com/sg/apple-events/september-2020). Apple đã giới thiệu một số mẫu Apple Watch và iPad mới. iPhone không thấy xuất hiện. Phiên bản chính thức của iOS 14 cũng được phát hành chỉ một ngày sau sự kiện khiến cộng đồng lập trình viên iOS rất bất ngờ vì [không có thời gian chuẩn bị](https://twitter.com/jamesthomson/status/1305927905839583234) cũng như phát hành các bản cập nhật bằng phiên bản Xcode Golden Master.

Một sự kiện đáng chú ý khá đó là việc Apple thay đổi một số chính sách trong App Store Review. Mời các bạn đọc thêm về các thay đổi đáng chú ý trong bản tin này nhé.

# Swift:

## Swift 5.3 released

Phiên bản Swift 5.3 được giới thiệu từ WWDC 2020 đã được phát hành cùng với Xcode 12 phiên bản chính thức.

- Thông tin tổng kết về phiên bản 5.3 có [tại đây](https://swift.org/blog/swift-5-3-released/).
- Video giới thiệu Swift 5.3 tại WWDC 2020 có [tại đây](https://developer.apple.com/videos/play/wwdc2020/10170/)

## Swift Cluster Membership

Đây là thư viện để quản lý các ứng dụng Swift Server Side. Chi tiết tại [Swift Blog](https://swift.org/blog/swift-cluster-membership/)

## What's new in CryptoKit

CryptoKit là một thư viện dùng để thực hiện các tác vụ liên quan đến Security. Nếu trước đây chung ta thường phải sử dụng OpenSSL cho việc này thì từ iOS 13, CryptoKit đã có khá đầy đủ các tính năng để thay thế được OpenSSL. Chi tiết về các tính năng mới ở CryptoKit có thể đọc [tại đây](https://developer.apple.com/news/?id=3bwfq45y)

# Apple:

## App Store Review Guideline udpates

Apple đã [cập nhật guidelines](https://developer.apple.com/news/?id=xqk627qu) cho Apple Store Review, chủ yếu liên quan đến In-App-Purchase, đặc biệt là sau lùm xùm với Epic Games liên quan đến game Fortnite.

Tổng kết ngắn gọn về các thay đổi các bạn có thể đọc [tại đây](https://marco.org/2020/09/11/app-review-changes).

https://developer.apple.com/news/?id=xqk627qu

## Apple Store Marina Bay

Apple vừa [một mở cửa hàng mới](https://www.apple.com/sg/retail/marinabaysands/) với thiết kế khá độc đáo ở Singapore. Cả cửa hàng là một khối cầu nổi với thiết kế mở, góc nhìn 360 độ và có cả 1 tầng dưới mặt nước.

- [Hình ảnh về cửa hàng](https://www.channelnewsasia.com/news/lifestyle/apple-store-marina-bay-sands-singapore-13090594)
- [Video giới thiệu cửa hàng](https://www.youtube.com/watch?v=RL21zx-Ej1Y)

Hôm nào có điều kiện mình sẽ làm 1 vòng selfie chụp ảnh cho mọi người tham khảo.

# Bài viết:

## The State of SwiftUI

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/swiftui.png)

SwiftUI được giới thiệu lần đầu tại WWDC 2019, phiên bản nâng cấp được giới thiệu tại WWDC 2020. Trải qua 2 năm, SwiftUI nhận được nhiều ý kiến trái chiều khác nhau từ giới lập trình viên iOS. Bài viết ["The State of SwiftUI"](https://steipete.com/posts/state-of-swiftui/) của @[steipete](https://steipete.com/) được đánh giá phản ánh rất trung thực và thực tế tình trạng hiện thời của SwiftUI.

## Lịch sử trang System Preferences trên macOS

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/macos_preferences.jpg)

Ai đã dùng máy Mac thì chắc chắn đã quen thuộc với ứng dụng System Preferences. Có thể nói đây là một trong những ứng dụng ít thay đổi nhất trong các phiên bản macOS. Các bạn tham khảo một bài viết khá thú vị về [lịch sử trang System Preferences trên macOS](https://www.arun.is/blog/system-preferences/)

## `Optional` có thực sự luôn tốt?

`Optional` là một tính năng hữu ích của Swift, giúp lập trình viên có thể viết code để kiểm tra một biến có chứa dữ liệu hay không và dễ dàng tránh tình trạng truy cập vào biến chưa khởi tạo hoặc đã giải phóng. Tuy nhiên việc sử dụng `Optional` sai cách cũng có thể khiến cho ứng dụng có những unexpected behaviours. [Bài viết này](https://appdecentral.com/2020/09/16/the-danger-of-playing-it-safe/) phân tích một ví dụ về việc khiến app bị crash khi truy cập biến `Optional` cũng là một giải pháp thay vì việc luôn luôn unwrap biến `Optional`.

## Chú ý khi sử dụng `extension`

`extension` là một tính năng hữu ích khác của Swift. `extension` được sử dụng vào nhiều mục đích khác nhau như thêm tính năng vào các kiểu dữ liệu có sẵn, phân chia code thành các thành phần khác nhau, vân vân ... Tuy nhiên việc sử dụng `extension` cũng cần được cân nhắc kỹ càng vì nó có thể làm phân mảnh mã nguồn, gây khó khăn cho việc tìm hiểu mã nguồn. [Bài viết này](https://dmtopolog.com/dark-side-of-extensions/) phân tích một số pitfalls cần tránh khi sử dụng `extension`

# Mã nguồn:

## Làm iOS App Switcher bằng SwiftUI

Đây là một mã nguồn demo khá hay, thể hiện được ưu điểm của SwiftUI khi được dùng để làm các animation phức tạp. Các bạn có thể xem mã nguồn [tại đây](https://github.com/crafterm/swiftui-app-switcher).

## UTM: Máy ảo cho iOS

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/utm.png)

Nếu các bạn đã quen với Parallel hay VirtualBox trên macOS, thì [UTM](https://getutm.app/) có chức năng tương tự nhưng chạy trên iOS. Mã nguồn của UTM được [mở trên github](https://github.com/utmapp/UTM)

# Tool:

## Tạo nhanh icon cho ứng dụng

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/appiconhero.png)

Việc tạo icon cho ứng dụng khá là mất thời gian vì chúng ta cần phải cung cấp nhiều hình cho nhiều resolution khác nhau. Trang web [appiconhero.co](https://appiconhero.co/) rất hữu ích trong việc tự động tạo các hình này chỉ bằng một tấm hình duy nhất. Đặc biệt là tất cả đều miễn phí.

# Tips & Tricks:

## Xoá nhanh các disabled breakpoints trong Xcode 12

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/xcode_delete_breakpoints.png)

Xcode 12 có [một option](https://twitter.com/zntfdr/status/1306086993374314496) để xoá nhanh các breakpoints đã bị vô hiệu hoá. Rất hữu ích cho việc debuggung app.

## Lọc nhanh Simulators và Scheme trong Xcode

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/xcode_simulators.gif)

Sử dụng tính năng lọc nhanh để tìm Simulator hoặc Scheme cần tìm, chi tiết [tại đây](https://twitter.com/novallkhan/status/1301948845220298753)

## Test deeplinks và universal links

Kiểm thử deeplinks và universal links là một việc không dễ dàng vì nó đòi hỏi app phải được bắt đầu từ background. [Bài viết này](https://swiftrocks.com/ui-testing-deeplinks-and-universal-links-in-ios) giới thiệu một phương pháp sử dụng XCUITest đề ở một deeplink từ Safari để kiểm thử, rất hữu ích cho các ứng dụng có nhiều deeplinks.

# Giới thiệu ứng dụng:

## Mojo Cut

![14](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/14/mojo.png)

[Mojo Cut](https://apps.apple.com/vn/app/mojo-cut/id1522510649) là ứng dụng do các lập trình viên Việt Nam phát triển dựa trên dự án [cyrildiagne/ar-cutpaste](https://github.com/cyrildiagne/ar-cutpaste), ứng dụng sẽ hỗ trợ tách nền ảnh, xóa phông ảnh chỉ trong 3 giây ngắn ngủi với thao tác đơn giản ngay trên điện thoại.

# Lời kết:

Hai tuần vừa rồi mình khá bận với công việc mới và việc ổn định cuộc sống ở Singapore nên không có thời gian viết bản tin Swift Việt Nam. Nếu bạn nào có hứng thú muốn tham gia viết bài cùng mình thì có thể liên lạc với mình qua [group của Swift Việt Nam](https://www.facebook.com/groups/691941251234927) nhé. Để đảm bảo chất lượng của của bài viết, mình cũng sẽ viết 1 bài mỗi 2 tuần thay vì 1 bài 1 tuần như trước.

Nếu các bạn có các bài viết liên quan đến Swift, WWDC, lập trình iOS và các platform khác của Apple muốn chia sẻ với cộng động thì các bạn [tham gia nhóm thảo luận Swift Việt Nam](https://www.facebook.com/groups/691941251234927) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.

---
date: 2020-07-22 08:21
description: Bản tin Swift Việt Nam #8
tags: news
---

![8](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/8/swiftvietnam_8.png)

# Bản tin Swift Việt Nam #8

Tuần vừa rồi chắc bạn nào dùng Facebook SDK thì cũng biết là app của bạn sẽ bị crash vì lỗi của Facebook SDK. Rất nhiều app lớn trên thế giới như Spotify, Pinterest, Tinder cũng bị [chung số phận](https://www.theverge.com/2020/7/10/21319784/ios-apps-crashing-spotify-tiktok-pinterest-tinder-facebook-sdk-certification-issue). Điều đáng nói là đây là [lần thứ 2](https://www.theverge.com/2020/5/6/21250023/facebook-sdk-login-spotify-tinder-tiktok-ios-iphone-crash) Facebook SDK khiến hàng loạt apps bị chết như vậy chỉ trong vài tháng. Cá nhân mình thấy điều này thự sự nguy hiểm vì một SDK không nên can thiệp quá sâu vào apps như vậy. Vấn đề ở đây là các SDK lớn như Facebook SDK hay Firebase dùng [Method Swizzling](https://nshipster.com/method-swizzling/) để thay thế các tính năng của iOS SDK bằng implementation của mình. Thế nên các SDK này thực sự đã khả dụng ngay cả khi bạn chưa sử dụng bất cứ tính năng nào của nó. Nếu có thể, các bạn nên tránh sử dụng các SDKs khi các bạn không thể tắt được tính năng Method Swizzling đi vì rất dễ gây xung đột. Ví dụ như Firebase cho phép bạn tắt Method Swizzling theo [hướng dẫn sau](https://firebase.google.com/docs/cloud-messaging/ios/client#:~:text=Method%20swizzling%20in%20Firebase%20Cloud%20Messaging,-The%20FCM%20SDK&text=Developers%20who%20prefer%20not%20to,to%20NO%20).

# Swift:

## Swift Service Lifecycle

Apple mới giới thiệu một Framework mới dành cho Server-Side Swift có tên là `Swift Service Lifecycle`. Tại mình cũng không quan tâm lắm đến Swift trên server nên mình không đi vào chi tiết. Các bạn đọc bài giới thiệu về Swift Service Lifecycle [ở đây](https://swift.org/blog/swift-service-lifecycle/) hoặc xem mã nguồn [tại đây](https://github.com/swift-server/swift-service-lifecycle).

# Bài viết:

## Mẹo phỏng vấn việc làm cho iOS developers:

![8](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/8/interview.png)

Là iOS devs, chắc hẳn anh em chúng ta đều có ít nhiều kinh nghiệm tham gia các cuộc phỏng vấn việc làm. Tuỳ quy mô công ty, start-up hay công ty lớn, cấu trúc của các cuộc phỏng vấn, thời gian phỏng vấn cũng như số vòng phỏng vấn sẽ khác nhau. Mình không có kinh nghiệm về phỏng vấn iOS Devs ở Việt Nam, nhưng mình cũng tham gia nhiều vòng phỏng vấn ở Đức, Sing, Mỹ nên mình recommend các bạn bài [Navigating the iOS Interview](https://www.raywenderlich.com/10625296-navigating-the-ios-interview) để tham khảo. Bài viết mô tả khá chi tiết các thành phần của một process phỏng vấn cho vị trí iOS, cũng như những kinh nghiệm và cách thức học, chuẩn bị cho những vòng phỏng vấn này.

## GridView trong SwiftUI

![8](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/8/gridview.png)

Một trong những bổ xung đáng giá của SwiftUI trong năm 2020 là Grid layout (hay UICollectionView trong UIKit). Với việc SwiftUI hỗ trợ xây dựng app cho hầu hết các platforms của Apple, nhu cầu làm responsive design cho Swift Apps khá là cần thiết, và Grid layout là một công cụ rất quan trọng cho thiết kế này. Rất may Apple đã cung cấp các API `LazyVGrid` và `LazyHGrid` trong bản cập nhật SwiftUI mới. Anh bạn Majid có viết một bài miêu tả khá chi tiết cách thức hoạt động của `LazyVGrid` và `LazyHGrid` [tại đây](https://swiftwithmajid.com/2020/07/08/mastering-grids-in-swiftui/).

## SwiftUI vs UIKit

Nếu các bạn đang quen sử dụng UIKit và bắt đầu học SwiftUI, chắc chắn các bạn sẽ thấy rất khó hiểu lúc bắt đầu. Điều này không có gì là lạ vì SwiftUI đi theo hướng ["declarative UI"](https://developer.apple.com/xcode/swiftui/) còn UIKit là "imperative UI". Một trong những concept đặc biệt của SwiftUI là tất cả `View` đều được khai báo bằng `struct`, tức là một `value type`, chứ không như `UIView` là một class, tức là `reference type`. Bài viết [này](https://www.hackingwithswift.com/books/ios-swiftui/why-does-swiftui-use-structs-for-views) của anh Paul Hudson sẽ giải thích rõ hơn tại sao `View` trong SwiftUI lại là `struct`.

## Dùng Bazel để tăng tốc build iOS apps

Bài này cho một bạn lập trình viên người việt tên [Thi](https://twitter.com/thi_dt) đang làm cho Line ở Nhật viết trên blog của công ty. [Bazel](https://bazel.build/) là một build system được phát triên bởi Google, đặc biệt thích hợp để xây dựng các hệ thông lớn, phức tập, có nhiều dependencies. Đặc biệt với khả năng cache builds và artifacts, qúa trình build các app lớn, nhiều dòng code được tăng tốc rất nhiều. Các bạn có thể đọc chi tiết [bài của bạn Thi](https://engineering.linecorp.com/en/blog/improving-build-performance-line-ios-bazel/) xem Line đã sử dụng Bazel để tăng tốc build app Line như thế nào nhé.

# Mã nguồn:

## AAChartKit-Swift

![8](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/8/aachartkit.png)

Nếu bạn đang tìm một framework để vẽ biểu đồ trong ứng dụng của mình thì các bạn không thể bỏ qua [AAChartKit-Swift](https://github.com/AAChartModel/AAChartKit-Swift). AAChartkit-Swift hỗ trợ rất nhiều loại biểu đồ khác nhau, bạn cũng có thể tương tác trực tiếp với các biểu đồ này, hỗ trợ `iOS`, `iPadOS` và `macOS`. Bạn có thể tham khảo mã nguồn và cách sử dụng AAChartKit-Swift [tại đây](https://github.com/AAChartModel/AAChartKit-Swift) nhé.

# Công cụ:

## Rectangle

![8](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/8/rectangle.png)

Một ứng dụng dành cho macOS mã nguồn mở để quản lý cửa sổ một cách dễ dàng bằng các phím tắt. Ứng dụng này đặc biệt hữu ích nếu các bạn sử dụng màn hình phụ với độ phân giải lớn. Bạn sẽ có thể dễ dàng sắp xếp các cửa sổ này theo layout bạn thích để tiện cho công việc. Vì là ứng dụng mã nguồn mở nên nó hoàn toàn miễn phí. Bạn có thể tại app [tại đây](https://rectangleapp.com/), hoặc tham khảo mã nguồn [tại đây](https://github.com/rxhanson/Rectangle)

# Lời kết:

Nếu các bạn có các bài viết liên quan đến Swift, WWDC và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
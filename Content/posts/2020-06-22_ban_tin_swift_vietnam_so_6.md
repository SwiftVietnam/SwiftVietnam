---
date: 2020-06-22 08:21
description: Bản tin Swift Việt Nam #6 - WWDC có gì mới?
tags: news
---

![6](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/6/swiftvietnam_6.png)

# Bản tin Swift Việt Nam #6 - WWDC Special

Vậy là WWDC20 đã kết thúc. Anh em lập trình viên chúng ta lại có thêm nhiều APIs để nghịch. Apple không giới thiệu phần cứng mới nào trong WWDC lần này nhưng macOS on Apple Silicon là một thay đổi lớn và sẽ ảnh hưởng nhiều đến các phần cứng được giới thiệu trong tương lai.

WWDC20 cũng đánh dấu lần đầu tiên WWDC được tổ chức trực tuyến thay vì tập trung tại hội trường. Phần Keynote và Platforms State of the Union được thu sẵn nên hình ảnh mượt mà bóng bảy hơn. Các nhân mình cảm thấy chưa quen và "nhớ" những tràng pháo tay khi tính năng mới được giới thiệu như trong ác WWDC trước.

Phần Platforms State of the Union được lập trình viên chờ đợi nhất thì mình thấy hơi nhàm chán vì hơn 30 phút đầu Apple chỉ tập trung nói về macOS on Apple Silicon. Tuy nhiên với việc giới thiệu macOS Big Sur, iOS 14 với cải tiền màn hình chính, Widgets và App Clips, iPadOS với các tính năng mới giúp tận dùng diện tích màn hình tốt hơn, watchOS hỗ trợ nhiều Complications từ một app, Xcode 12 cực kỳ ít crash và có auto completion cực nhanh, mình cảm thấy khá hài lòng với kỳ WWDC lần này. 

Đặc biệt là các video của WWDC được làm rất ngắn gọn và đi thẳng vào trọng tâm. App Apple Developer hỗ trợ rất tốt việc vừa xem video và vừa copy code theo đúng timeline, rất thuận tiện trong việc thử code trực tiếp.

# Các phiên bản hệ điều hành mới

Apple đã giới thiệu iOS 14, iPad 14, tvOS 14, watchOS 7, macOS Big Sur (sẽ là phiên bản 11 của macOS) với rất nhiều tính năng cũng như thiết kế mới.

Mình sẽ không đi sâu vào giới thiệu các tính năng mới của các phiên bản hệ điều hành này. Bạn có thể xem thêm trên các trang tin tức khác:

- [Tinh tế](https://tinhte.vn/thread/wwdc20-ios-14-chinh-thuc-tu-dong-gom-ung-dung-widget-moi-them-loat-tinh-nang-cho-siri.3151444/) 
- [Zing](https://zingnews.vn/7-thay-doi-dang-cho-doi-nhat-tren-ios-14-post1098587.html#zingweb_category_category476_featured_5)
- [9To5Mac](https://9to5mac.com/2020/06/22/wwdc-2020-live-blog-news/)
- [Techcrunch](https://techcrunch.com/2020/06/22/heres-everything-apple-announced-in-the-wwdc-2020-keynote-today/)

# Các API mới

## Swift 5.3

Các tính năng mới trong Swift 5.3 chúng ta đều biết trước hết rồi vì các quá trình Swift Evolution đều public hết cả.

![language_features](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/6/language_features.png)

## SwiftUI

Có thể nói trong WWDC20, Apple đã giới thiệu SwiftUI 2.0 với rất nhiều tính năng mới. Đặc biệt chúng ta có thể thấy nỗ lực của Apple khi đảm bảo backward compability, hỗ trợ tất cả các app được viết bằng SwiftUI 1.0. 

Với SwiftUI mới, chúng ta đã có thể viết tất cả các app, widgets, extensions trên tất cả các platforms của Apple bằng SwiftUI, đúng như chiến lược [SwiftUI On All Devices](https://developer.apple.com/videos/play/wwdc2019/240/)

Các thông tin ngắn gọn về những tính năng mới của SwiftUI các bạn có thể xem [tại đây](https://wwdcnotes.com/notes/wwdc20/10041/). Một số phân tích chi tiết hơn [ở đây](https://swiftwithmajid.com/2020/06/23/what-is-new-in-swiftui/)

Một Youtube video tổng hợp của anh Paul Hudson về những tính năng mới của SwiftUI có [tại đây](https://www.hackingwithswift.com/articles/221/whats-new-in-swiftui-for-ios-14).

## UICollectionView + UICollectionLayoutListConfiguration

Tất nhiên Apple cũng vẫn bổ sung các tính năng mới cho UIKit, đặc biệt là với UICollectionView. Nếu như trong WWDC2019, 
UICollectionView được bổ sung DiffableDataSource và các layout mới để để tối ưu việc hiển thị dữ liệu trên nhiều resolutions khác nhau, thì trong WWDC20 lần này, Apple giới thiệu `UICollectionLayoutListConfiguration`để giúp chúng ta có thể sử dụng `UICollectionView` như một `UITableView`. Thông tin ngắn gọn về `UICollectionLayoutListConfiguration` các bạn có thể xem [tại đây](https://wwdcnotes.com/notes/wwdc20/10026/)

##  Swift Package Manager

Điểm mới đáng chú ý nhất là SPM sẽ hỗ trợ resources (ảnh, phim vân vân...) bằng cách sử dụng assets catalog (.xcasset) trong Xcode 12/Swift 5.3. 

Thông tin tông hợp ngắn gọn các bạn có thể xem [ở đây](https://wwdcnotes.com/notes/wwdc20/10169/).

## WidgetKit

![intent_configuration.png](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/6/intent_configuration.png)

Apple cuối cùng cũng copy tính năng Widget từ Android 😬. 

Chúng ta có thể tạo Widget bằng framework WidgetKit. Điểm đặc biệt là các Widget chỉ được dùng để hiển thị thông tin mà không có chức năng tương tác nào.

Thông tin ngắn gọn về WidgetKit có [tại đây](https://wwdcnotes.com/notes/wwdc20/10028/).

## StoreKit Testing in Xcode

Việc phát triển In-App-Purchase thường rất phức tạp vì chúng ta phải chuyển qua lại giữa Sandbox và Production để test. Trong Xcode 12, Apple đã tích hợp chức năng kiểm thử In-App-Purchase trực tiếp vào Xcode, giúp chúng ta kiểm tra được IAP có hoạt động hay không dễ dang hơn rất nhiều. Chi tiết các bạn xem [ở đây](https://developer.apple.com/videos/play/wwdc2020/10659/).

Hướng dẫn cụ thể từng bước có [tại đây](https://www.revenuecat.com/blog/storekit-testing-in-xcode)

## App Clips

App Clips có thể coi là một phiên bản rút gọn của apps. Bằng cách quét QRCode hoặc dùng NFC, người dùng có thể cài đặt các App Clips (dung lượng dưới 10MB) nhanh và chạy ngay để dùng được một tính năng nhất định mà không phải cài đặt toàn bộ cả app. Cái này có lẽ giống Instant App trên Android.

Chi tiết về App Clips có [tại đây](https://developer.apple.com/videos/play/wwdc2020/10174/).

## CoreML - Machine Learning:

Năm nay Apple không giới thiệu nhiều tính năng mới cho mảng máy học. Một điểm đáng chú ý nhất có lẽ là tính năng [mã hoá model](https://developer.apple.com/documentation/coreml/core_ml_api/encrypting_a_model_in_your_app) để không ai có thể đánh cắp model của bạn và dùng trên app khác. Ngoài ra các Frameworks như Vision cũng được bổ sung một số tính năng như nhận diện tay và cơ thể.

Các tính năng mới khác có trong CoreML các bạn có thể tham khảo [tại đây](https://machinethink.net/blog/new-in-apple-machine-learning-2020/)

## Quyền riêng tư

Apple tiếp tục đầu tư vào bảo vệ quyền riêng tư của người dùng. Mọi người chắc hẳn đều đang giật mình việc [Tiktok hay Zalo copy thông tin từ pasteboard](https://tinhte.vn/thread/ban-ve-chuc-nang-tu-doc-clipboard-cua-zalo-tiktok.3154165/) của iPhone mà chỉ nhờ có iOS chúng ta mới biết. Là một lập trình viên, mình có thể hiểu được vì sao chúng ta cần lấy thông tin từ pasteboard cho một số tính năng nhất định. Tuy nhiên với iOS 14, lập trình viên cần chú ý hơn khi sử dụng các API này hoặc phải giải thích cụ thể cho người dùng tại sao lại có tính năng đó.

Thông tin thêm về các tính năng bảo về quyền riêng tư từ Apple các bạn có thể xem [ở đây](https://wwdcbysundell.com/2020/security-privacy-announcements-at-wwdc20/)

# Lời kết:

Trên đây chỉ là một số thông tin ngắn gọn về WWDC mình tổng hợp lại trong hơn 1 tuần vừa rồi. Toàn bộ videos của WWDC20 có [tại đây](https://developer.apple.com/videos/all-videos/). Chúng ta có hẳn 1 năm để nghiền ngẫm trước khi WWDC21 bắt đầu 😋.

Mình cũng xin giới thiệu một số tài nguyên khác liên quan đến WWDC để mọi người tiện tham khảo: 

- [WWDC Notes](https://github.com/Blackjacx/WWDC)
- [WWDC 2020 Session Notes](https://github.com/Blackjacx/WWDC)
- [WWDC By Sundell](https://wwdcbysundell.com/)
- [WWDC Community](https://github.com/twostraws/wwdc)
- [What's new in SwiftUI for iOS 14](https://www.hackingwithswift.com/articles/221/whats-new-in-swiftui-for-ios-14)
- [WWDC20 Sample Code](https://github.com/artemnovichkov/wwdc20-samplecode)


Nếu các bạn có các bài viết liên quan đến Swift, WWDC và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
---
date: 2020-07-29 08:21
description: Bản tin Swift Việt Nam #9
tags: news
---

![9](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/9/swiftvietnam_9.png)

# Bản tin Swift Việt Nam #9

Tuần vừa rồi Apple đã phát hành Beta 3 cho Xcode 12, iOS và iPadOS với một số APIs mới. Apple cũng đã opensource thư viện Exposure Notification. Thư viện này được các nước trên thế giới sử dụng để xây dựng các app contac tracing giúp cho công việc chống lại COVID-19. Mình có tìm hiểu ở Việt Nam có app [Bluezone](https://www.bluezone.gov.vn/) được phát triển bởi BKAV lại không dùng thư viện này. Rất mong các phiên bản tiếp theo của Bluezone sẽ được cập nhật để sử dụng thư viện này vì nó được hỗ trợ trực tiếp từ Apple. Bản thân mình cũng đang tham gia một dự án liên quan đến thư viện này nên mình rất ủng hộ việc sử dụng Exposure Notification Framework. Tuy nhiên điểm yếu của việc này là chỉ có máy cài được iOS 13 trở lên mới sử dụng được Exposure Notification Framework.

# Swift:

## New `async` keyword

Ai viết C# hoặc Javascript chắc quen với keyword async, await rồi. Với async, await, các code concurrency sẽ dễ viết hơn và logic sẽ dễ hiểu hơn.
👉 Trên Github của Swift vừa có [một PR](https://github.com/apple/swift/pull/33147) để giới thiệu keyword async cho Swift
👉 Anh Lattner cũng đã từng có bài Swift Concurrency Manifesto từ 3 năm trước, trong đó nhắc đến async và await [tại đây](https://gist.github.com/lattner/31ed37682ef1576b16bca1432ea9f782) 

## Mã nguồn mở Exposure Notification Framework

Apple đã cung cấp [mã nguồn](https://developer.apple.com/exposure-notification/) của [Exposure Notification Framework](https://developer.apple.com/documentation/exposurenotification) để mọi người tham khảo. Điểm đặc biệt là mã nguồn được viết bằng Objective-C 😃.

# Bài viết:

## Sử dụng OSLog

Với lập trình viên chúng ta, việc có logging data từ các app chúng ta viết là việc cực kỳ quan trong, không chỉ giúp ích cho việc tìm bugs mà còn giúp cho chúng ta hiểu được hành vi của người dùng. Với việc Apple [thắt chặt các quyền riêng tư trên iOS 14](https://developer.apple.com/app-store/user-privacy-and-data-use/), việc sử dụng các frameworks như Firebase Craslytics/Firebase Analytics/Sentry sẽ khó khăn hơn. Một giải pháp cho việc này là sử dụng các thành phần có sẵn của hệ điều hành như [OSLog](https://developer.apple.com/documentation/os/oslog) hay [MetricKit](https://developer.apple.com/documentation/metrickit). Trang [SwiftLee](https://www.avanderlee.com/debugging/oslog-unified-logging/) có giới thiệu về cách sử dụng OSLog [tại đây](https://www.avanderlee.com/debugging/oslog-unified-logging/). Thông tin về [MetricKit](https://developer.apple.com/documentation/metrickit), các bạn có thể xem trực tiếp từ [WWDC video này](https://developer.apple.com/videos/play/wwdc2020/10081/).

## Sử dụng CoreData với SwiftUI trong Xcode 12

Nếu các bạn tạo project SwiftUI mới trong Xcode 12, các bạn sẽ không thấy `AppDelegate` hay `SceneDelegate` nữa, gây khó khăn cho việc thiết lập `CoreData`. Donny Wals có giới thiệu một cách để các bạn thiết lập CoreData và kết nối nó với phần UI [tại đây](https://www.donnywals.com/using-core-data-with-swiftui-2-0-and-xcode-12/).

## Thêm resources vào Swift Package Manager

Từ Xcode 11, chúng ta có thể sử dụng Swift Package Manager, nhưng nó chỉ hỗ trợ các package chỉ có source code (tức là không có resource như hình ảnh, tập tin không phải Swift hay Objective-C). Từ Xcode 12, SPM đã hỗ trợ việc thêm các resources này vào package. Bạn có thể xem hướng dẫn chi tiết cách thêm và sử dụng resources trong SPM [tại đây](https://useyourloaf.com/blog/add-resources-to-swift-packages/).

# Mã nguồn:

## RSS Reader NetNewsWire 

![9](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/9/netnewswire.png)

[NetNewsWire](https://github.com/Ranchero-Software/NetNewsWire) là một ứng dụng RSS Reader mã nguồn mở dành cho tất cả các Apple platforms. Một điều thú vị là các maintainer của ứng dụng đã quyết định chuyển sang dùng SwiftUI. Đây là cơ hội tuyệt vời để các bạn học SwiftUI được mang những kỹ năng của mình ứng dụng vào thự tế, và vừa đóng góp được cho một úng dụng nguồn mở hay. Chi tiết về việc học SwiftUI với ứng dụng NetNewsWire [tại đây](https://blog.rizwan.dev/blog/learning-swiftui-with-netnewswire).

## Virutalization Framework

![9](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/9/simplevm.png)

Anh bạn [KhaosT](https://twitter.com/KhaosT) đã làm mộtt thử nghiệm để [chạy Ubuntu trong macOS app](https://twitter.com/KhaosT/status/1287289058964561920?s=20) sử dụng [Virtualization Framework](https://developer.apple.com/documentation/virtualization). Các bạn tham khảo mã nguồn [ở đây](https://github.com/KhaosT/SimpleVM).

## Snap

![9](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/9/snap.png)

Một UX design pattern khá phổ biến hiện nay là bottom drawer. Chúng ta có thể thấy nó ở Apple Maps, Apple Music hay Google Maps. Nếu bạn sử dụng SwiftUI, bạn có thể tham khảo [Snap], nếu bạn sử dụng UIKit, bạn có thể tham khảo [ContainerController](https://github.com/mrustaa/ContainerController)

## Network library của Spotify

![9](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/9/spotify.png)

Spotify tuần vừa rồi cũng giới thiệu một network library mà họ dùng trong app của họ, có tên là [SPTDataLoader](https://github.com/spotify/SPTDataLoader). Library này xây dựng dựa trên NSURLSession và hỗ trợ authentication + back-off policy. Các bạn tham khảo mã nguồn trên [Github](https://github.com/spotify/SPTDataLoader) nhé


# Lời kết:

Tuần tới mình sẽ relocate sang Singapore nên sẽ khá bận. Rất có thể bài viết cho tuần tới sẽ bị muộn hơn so với mọi lần, các bạn thông cảm nhé.

Nếu các bạn có các bài viết liên quan đến Swift, WWDC và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
---
date: 2020-08-26 08:21
description: Bản tin Swift Việt Nam #12
tags: news
---

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/swiftvietnam_12.png)

# Bản tin Swift Việt Nam #12

Cuộc chiến giữa Epic Games và Apple có vẻ vẫn chưa đến hồi kết khi Apple [doạ sẽ cắt tài khoản Apple Developer của Epic Games](https://www.cnbc.com/2020/08/17/epic-games-says-apple-threatened-to-revoke-developer-account.html), còn Epic Games thì [tiếp tục kiện Apple](https://techcrunch.com/2020/08/17/epic-games-apple-injunction/) ra toà và [doạ cắt hỗ trợ iOS khỏi Unreal Engine](https://www.theverge.com/2020/8/25/21400240/epic-apple-ruling-unreal-engine-fortnite-temporary-restraining-order). [Microsoft](https://www.androidpolice.com/2020/08/23/apple-says-it-will-cut-off-epic-games-from-ios-development-impacting-fortnite-and-unreal-engine-software/) và [Facebook](https://www.theverge.com/2020/8/14/21369169/facebook-paid-live-events-ios-android-apple-app-store-fees-fortnite-epic) cũng ăn hôi nhẩy vào bênh vực Epic Games một phần vì Apple cũng từ chối cho [Microsoft](https://www.theverge.com/2020/8/5/21356274/microsoft-xcloud-ios-apple-iphone-ipad-testing-ends-apple-app-store-policies) và [Facebook](https://www.theverge.com/2020/8/7/21358355/facebook-apple-app-store-policies-comments-facebook-gaming-ios) phát hành app games của riêng họ trên Apple Store. Apple tuần vừa rồi cũng dính thêm một phốt khác là việc [từ chối cho Automattic cập nhật app Wordpress](https://www.theverge.com/2020/8/21/21396316/apple-wordpress-in-app-purchase-tax-update-store)] của họ và bắt họ phải cung cấp In-App-Purchase, sau đó Apple đã[ phải xin lỗi](https://www.theverge.com/2020/8/22/21397424/apple-wordpress-apology-iap-free-ios-app) và cho phép Automattic cập nhật app Wordpress mà không cần IAP. Nhận định của mình là dù ai thắng thua trong cuộc chiến thương mại này, tương lai của App Store và In App Purchase sẽ có rất nhiều sự thay đổi.

# Swift:

## Thử nghiệm App Clip trên Testflight

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/appclips.jpg)

[Apple đã cập nhật Testflight](https://developer.apple.com/news/releases/?id=08182020) và cho phép chúng ta có thể thử nghiệm tính năng App Clip. Bản cập nhật này cũng trình làng [một icon mới](https://developer.apple.com/assets/elements/icons/testflight/testflight-128X128_2x.png) cho app Testflight. Thông tin thêm về bản cập nhật này [tại đây](https://9to5mac.com/2020/08/17/apples-testflight-ios-beta-distribution-app-updated-with-detailed-icon-fit-for-a-mac/).

## Tìm hiểu `OptionSet`

[`OptionSet`](https://developer.apple.com/documentation/swift/optionset) là một Protocol khá thú vị, đặc biệt hữu ích khi chúng ta muốn định nghĩa configurations cho một API nào đó vì các configuration có thể kết hợp với nhau. Bạn có thể tham khảo một bài viết thảo luận về `OptionSet` [tại đây](https://www.donnywals.com/understanding-swifts-optionset/).

# Bài viết:


## Kiểm thử Deeplink bằng UI Testing

Deep-Linking là một thành phần không thể hiệu trong các mobile app hiện nay. Tuy nhiên việc kiểm thử Deeplink không phải là chuyện dễ dàng và thường phải làm một cách thủ công. Từ iOS 13, Apple đã hỗ trợ và mở rộng iOS Simulator rất nhiều để giúp cho việc kiểm thử Deeplink dễ dàng hơn. Bạn có thể tham khảo [bài viết này](https://masilotti.com/test-deep-links-with-ui-testing/) để xem cách kiểm thử Deeplink một cách tự động nhé.

## Tips phát triển Widget cho iOS 14

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/widgets.png)

Widgets là một feature mới xuất hiện trong iOS 14. Với việc các lập trình viện hiện đang rất nóng lòng adopt Widget cho app của mình, mình xin giới thiệu một [bài viết](https://medium.com/swlh/10-tips-on-developing-ios-14-widgets-f17b865fbdbc) có liệt kê các tips và tricks hay trong việc lập trình widgets, mời các bạn tham khảo nhé.

# Mã nguồn:

## Thư viện phát hiện memory leak

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/memoryleak.png)

Mặc dù Swift đã hỗ trợ việc quản lý bộ nhớ tự động rất tốt, chúng ta vẫn cần phải cẩn trọng  khi viết code để tránh bị memory leak, đặc biệt là tránh việc có retain cycles.

Bạn @Đào Duy Quang (https://www.facebook.com/quangmin91) có thảo luận về vấn đề này trong bài [blog gần đây](https://medium.com/ne-digital/memory-leak-detection-in-runtime-on-ios-cb4193f185fb)

Bạn Quang cũng có phát hành một thư viện mã nguồn mở để kiểm tra Memory Leak [tại đây](https://github.com/duyquang91/leakdetector)

## AltStore - Sideload app mà không cần Jailbreak

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/altstore.png)

AltStore là một thư viện app dành cho các máy chạy iOS mà không cần phải Jailbreak. AltStore sử dụng Certificate và Provisioning Profiles của chính bạn để resign các app (từ file ipa) và sideload nó lên máy iOS của bạn. Bạn có thể tham khảo mã nguồn của AltStore [tại đây](https://github.com/rileytestut/AltStore)

## Arial - Screensaver cho Mac

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/aerial.gif)

Nếu bạn đã phải trầm trồ khi xem các ảnh screensaver trên Apple TV thì bạn có thể sử dụng [Aerial](https://github.com/JohnCoates/Aerial) để có thể xem các screensaver tương tự trên máy Mac của mình.

## Thư viện hiệu ứng chuyển động SwiftUI Animation

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/swiftui-animation.gif)

Một lợi thế của SwiftUI so với UIKit đó là việc tạo hiệu ứng chuyển động rất dễ dàng. Bạn có thể tham khảo repo [SwiftUI-Animations](https://github.com/Shubham0812/SwiftUI-Animations) để có cảm hứng cũng như tham khảo cách tạo hiệu ứng chuyển động tương tự trong các app phổ biến nhé.

# Tool:

## Sử dụng Xcode Search như một Todo list

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/xcode-todo.gif)

Tip này khá hay. Khi bạn tìm kiếm trong Xcode, bạn có thể sử dụng danh sách trả về như một todo list như [ở đây](https://twitter.com/lickability/status/1294295481812750336?s=20)

## Bạn tốn bao nhiêu thời gian chờ Xcode chạy code?

![12](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/12/xcode-buildtime.png)

Sử dụng [tool này](https://blog.kulman.sk/xcode-build-times/), bạn có thể đo được thời gian bạn chờ Xcode build code của bạn. Không có gì thiết thực lắm nhưng cũng khá thú vị 

# Hài hước:

Không biết thông tin này đáng cười hay đáng khóc 😂, nhưng Adobe vừa làm [mất hoàn toàn ảnh của người dùng](https://www.macrumors.com/2020/08/20/adobe-lightroom-ios-update-photos-deleted/) trong bản cập nhật mới của Lightroom.

# Lời kết:

Nếu các bạn có các bài viết liên quan đến Swift, WWDC, lập trình iOS và các platform khác của Apple muốn chia sẻ với cộng động thì các bạn [tham gia nhóm thảo luận Swift Việt Nam](https://www.facebook.com/groups/691941251234927) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
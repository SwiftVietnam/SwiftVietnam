---
date: 2020-06-10 23:21
description: Bản tin Swift Việt Nam #4
tags: news
---

![4](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/4/swiftvietnam_4.png)

# Bản tin Swift Việt Nam #4

Chỉ còn 2 tuần nữa là WWDC20 sẽ khai mạc. Các thông tin về sản phẩm cũng như dịch vụ mới của Apple xuất hiện ngày càng nhiều. Chúng ta hãy cùng nhau điểm qua các thông tin đang chú ý tuần qua về Swift và Apple ecosystem nhé.

# Swift

## Function Builder

[Function Builder](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md) là một feature được giới thiệu trong Swift 5.1, được biết đến chủ yếu qua tính năng @ViewBuilder được sử dụng trong SwiftUI. Sử dụng Function Builder, chúng ta có thể dễ dàng xây dựng được một Domain Specific Language riêng.

Hôm nay mình xin giới thiệu một số resources để các bạn học thêm về Function builder nhé:

- [Swift Evolution Proposal](https://github.com/apple/swift-evolution/blob/9992cf3c11c2d5e0ea20bee98657d93902d5b174/proposals/XXXX-function-builders.md)
- [Function Builders in Swift and SwiftUI](https://www.vadimbulavin.com/swift-function-builders-swiftui-view-builder/)
- [Swift Function Builders deep dive for Swift 5.3 - Following Swift Evolution 5.3](https://www.youtube.com/watch?v=LKFVcc_uC60)
- [awesome-function-builders](https://github.com/carson-katri/awesome-function-builders)
# Apple

## iOS/iPadOS 13.6 Beta, Xcode 11.6 Beta

Apple vừa phát hành iOS/iPadOS 13.6 Beta. Thực sự mình chưa có thời gian để xem có gì mới trong phiên bản 13.6 này. Các bạn theo dõi trang [9to5mac](https://9to5mac.com/2020/06/09/ios-13-6-beta-2-developers/) nhé, họ sẽ cập nhật các tính năng mới trong phiên bản 13.6 trong mấy ngày tới.

Liên quan đến lập trình viên chúng ta, Xcode 11.6 Beta cũng được phát hành và Apple không cho ai biết là có gì mới trong phiên bản này 🤷‍♂️.

![xcode116](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/4/xcode116.png)

## Máy Mac sử dụng chip Arm

Máy ngày này thông tin Apple sẽ giới thiệu máy Mac sử dụng chip Arm xuất hiện khắp các mặt báo. Đối với anh em iOS thì chắc không bị ảnh hưởng nhiều. Nhưng ai đang làm ứng dụng cho Mac sẽ phải chuẩn bị vì họ rất có thể sẽ phải biên dịch lại app của mình để chạy được trên máy Mac mới.

Tuy nhiên tất cả mới chỉ là tin đồn, chúng ta hãy chờ cụ thể xem trong WWDC20 tới.

Thông tin thêm về vấn đề này các bạn có thể đọc [ở đây](https://www.macrumors.com/2020/06/09/arm-based-macs-wwdc/).

# Bài viết

## RxSwift và MVVM

**RxSwift** là một reactive programming framework rất phổ biến và **Model-View-ViewModel(MVVM)** là một kiến trúc cũng rất quen thuộc. Đây là hai thành phần được dùng rất thường xuyên để xây dựng ứng dụng cho iOS. Tài liệu về **RxSwift** và **MVVM** trên mạng có rất nhiều. Nhưng hôm nay mình xin giới thiệu với các bạn serie bài viết bằng tiếng Việt của bạn [Bùi Khánh Duy](https://duybui297.site123.me/). 
Bạn Duy trong tuần có liên lạc với mình và ngỏ ý muốn tham gia đóng góp bài viết cho SwiftVietnam và mình hoàn toàn ủng hộ. 

Trong loạt bài viết của mình, bạn Duy có tạo một ứng dụng cơ bản và ứng dụng các kỹ thuật của **RxSwift** để xây dựng kiến trúc **MVVM** cho ứng dụng này. Các bạn xem loạt bài của bạn Duy [tại đây](https://duybui297.site123.me/rxswift-k%E1%BA%BFt-h%E1%BB%A3p-mvvm) nhé.

## Độ lớn của ứng dụng rất quan trọng

Với việc internet ngày càng nhanh, 3G/4G ngày càng rẻ, dung lượng lưu trữ của iPhone/iPad ngày càng lớn, lập trình viên có xu hướng không còn chú ý đến độ lớn của ứng dụng nữa. Chúng ta xử dụng thư viên bên thứ 3 vô tội vạ, cho ảnh và video khắp nơi trong ứng dụng mà không để ý là chúng ta đang làm ứng dụng của mình ngày càng nặng hơn. Hy vọng sau khi đọc [bài phân tích này](https://farfetchtechblog.com/en/blog/post/app-size-matters-ii/), các bạn sẽ thay đổi quan điểm của mình. Ứng dụng càng bé thì sẽ càng có nhiều lượt tải hơn. 

![appsize](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/4/app_install_variation_graphic_01.png)

Đối với lập trình viên, ứng dụng bé càng có ý nghĩa vì thời gian cài compile và install app lên máy trong quá trình phát triển cũng giảm thiểu đi đáng kể. Apple cũng có rất nhiều công nghệ giúp cho lập trình viên giảm độ lớn của ứng dụng như [Bitcode](https://developer.apple.com/documentation/xcode/reducing_your_app_s_size/doing_basic_optimization_to_reduce_your_app_s_size), [App Thinning](https://developer.apple.com/videos/play/wwdc2015/404/), [On demand resources](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/On_Demand_Resources_Guide/index.html).

# Code

## NotesTextView

Thư viện này mở rộng tính năng cho `UITextView` bằng cách styling text bằng NSAttributedString, rất thích hợp cho các ứng dụng ghi chú hoặc viết nhật ký.

Các bạn có thể xem thêm chi tiết [tại đây](https://github.com/Rimesh/NotesTextView).

## Indie Apps Showcases

**(Cái này là không biết xấu hổ là gì này 😉)**

Tuần vừa rồi mình có tình cờ đọc được trên twitter cái [thread này](https://twitter.com/stroughtonsmith/status/1266058437374476293). Trong thread này, các bạn developers khắp thế giới có giới thiệu về apps của họ đang làm trong thời gian qua. Có rất nhiều app hay và đáng chú ý. Thế là mình nảy ra ý tưởng viết một cái app để mọi người có thể tự giới thiệu các projects của mình tương tự như trên.

**Indie Apps Showcases** là sản phẩm mấy ngày làm việc của mình. Ứng dụng viết bằng **SwiftUI** và **Combine**, sử dụng kiến trúc [**The Composable Architecture**](https://github.com/pointfreeco/swift-composable-architecture), và sử dụng git repository làm backend. Ứng dụng và nội dung của app hoàn toàn mở và có trên GitHub.

Ứng dụng này rất thích hợp cho bạn nào đang muốn bắt đầu học SwiftUI + Combine. 

Các bạn xem thêm thông tin chi tiết [tại đây](https://github.com/antranapp/IndieApps) nhé.

# Sách

## iOS Apperentice

Các bạn bên raywenderlich.com đang cho xem sách iOS Apperentice miễn phí. Sách này rất thích hợp cho các bạn nào đang bắt đầu tìm hiểu về iOS. Các bạn đọc sách [tại đây](https://www.raywenderlich.com/community-care/ios-apprentice) nhé.

# Vui

Đúng là người Việt Nam [quá giàu](https://twitter.com/BenGeskin/status/1268831689914159104?s=20) 😆

# Lời kết

Mình rất vui vì có cơ hội giới thiệu về loạt vài viết tiếng Việt của bạn [Duy](https://duybui297.site123.me/) trong bản tìn lần này. Vẫn biết là resources để học iOS bằng tiếng Anh có rất nhiều trên mạng, và việc đọc hiểu tiếng Anh là một kỹ năng bắt buộc của bất cứ lập trình viên nào, thế nhưng các bài viết tiếng Việt như của bạn Duy sẽ rất hữu ích cho các bạn mới bước đầu vào học lập trình cũng như các bạn chưa có kỹ năng đọc tài liệu tiếng anh tốt.

Mình rất mong muốn lại có cơ hội giới thiệu trong các bản tin tiếp theo các bài viết chuyên sâu về Swift bằng tiếng Việt. Nếu các bạn có các bài viết liên quan đến Swift và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
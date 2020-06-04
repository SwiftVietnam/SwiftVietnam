---
date: 2020-06-23 23:21
description: Bản tin Swift Việt Nam #3
tags: news
---

# Bản tin Swift Việt Nam #3

![3](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/swiftvietnam_3.png)

Vậy là chúng ta đã bước sang tháng 6, tháng của WWDC. Lần đầu tiên WWDC được tổ chức online, vẫn chưa biết Apple sẽ tổ chức WWDC như thế nào. Rất nhiều sự kiện tổ chức thường niên song song với WWDC cũng đã được [chuyển lên online](https://twitter.com/subdigital/status/1265724374642024448).

Với việc WWDC20 đang tiến đến rất gần, có 1 điều chắc chắn là Apple sẽ mang đến nhiều cải tiến cho các framework như SwiftUI và Combine. Các project mới sẽ bắt đầu sử dụng các công nghệ này nhiều hơn. Nếu các bạn vẫn còn đang chần chừ trong việc tìm hiểu SwiftUI và Combine thì bây giờ là lúc nên bắt đầu. Bài viết này cũng sẽ tập trung cung cấp cho các bạn nhiều thông tin về SwiftUI và Combine nhằm giúp các bạn chuẩn bị tốt nhất cho WWDC20.

Tuần này có thêm 1 sự kiện nữa là nhiều người làm công nghệ cũng hưởng ứng phong trào #BlackLivesMatter nên họ quyết định ít chia sẻ về tech hơn mà dành nhiều thời gian nói về sự kiện chính trị này nên mình cũng không thu thập được nhiều thông tin như các số trước.

# Tin Tức

## Swift AWS Lambda Runtime

Thông tin đáng chú ý nhất về Swift trong tuần vừa rồi là việc Amazon AWS đã chính thức hỗ trợ sử dụng [Swift cho dịch vụ AWS Lambda](https://github.com/swift-server/swift-aws-lambda-runtime/).

AWS Lamda là dịch vụ serverless của AWS. Bạn có thể viết một function làm một công việc nhất định trong một thời gian ngắn mà không phải lo việc maintain cả 1 server. AWS Lamda sẽ lo phần infrastructure hết cho ban.  
Bạn có thể xem ví dụ Hello World trong hình. 

![aws](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/awslambda.png)

Chi tiết xem thêm tại [blog](https://swift.org/blog/aws-lambda-runtime/) nhé.

## LlBuild2

Nếu bạn là iOS developer thực thụ, đã làm việc với các ứng dụng lớn, chắc chắn các bạn sẽ hiểu là swift compiler chậm như thế nào nếu app của bạn đủ lớn. Apple tuần vừa rồi có thông báo là học đang thử nghiệm một build system mới cho Swift compiler có tên là [llbuild2](https://forums.swift.org/t/llbuild2/36896). Mục đích của llbuild2 là thử nghiệm các API mới, ứng dụng các thư viện từ ecosystem để cải thiện tốc độ build. Nói chung cái này khá là low-level, thích hợp cho các bạn nào thích tọc vạch và tự build swift complier cho riêng mình :). Chi tiết các bạn có thể đọc thêm tại [diễn đàn](https://forums.swift.org/t/llbuild2/36896).

## Sách miễn phí Understanding Swift

Anh bạn [Paul Hudson](https://www.hackingwithswift.com/) tuần vừa rồi mới cho ra lò sách [Understanding Swift](https://www.hackingwithswift.com/) miễn phí. Sách này trả lời các câu hỏi thường gặp cho những ai học Swift như lúc nào thì nên dùng `struct` thay cho `class` etc... Cuốn sách này theo mình thích hợp cho các bạn đang ở trình đồ beginner đến intermediate. 

Ngoài cuốn sách này, anh Paul Hudson còn rất nhiều ấn phẩm miễn phí khác phục vụ cho việc học Swift như ["100 ngày SwiftUI"](https://www.hackingwithswift.com/100/swiftui) hay [app Unwrapped](https://apps.apple.com/us/app/unwrap/id1440611372) dạy Swift từ căn bản. Nói chung các bạn cứ lên trang hackingwithswift.com sẽ tìm thấy nhiều thông tin bổ ích.

# Apple

## Zero-day in Sign in with Apple

Apple vừa có một lỗi khá nghiêm trọng với chức năng "Sign in with Apple" khiến account của người dùng có thể bị chiếm đoạt dễ dàng. Anh bạn [Bhavuk Jain](https://bhavukjain.com/about/) là người phát hiện ra lỗ hổng này và đã được Apple thưởng cho 100,000$ 😯. Bạn có thể đọc thêm về lỗ hổng này ở trên [blog của Jain](https://bhavukjain.com/blog/2020/05/30/zeroday-signin-with-apple/).

# Bài viết

## SwiftUI DSL hoạt động như thế nào?

Bạn Harshil Shah có [bài viết](https://harshil.net/blog/swiftui-dsl-function-builders) giải thích cách hoạt động của SwiftUI DSL (domain specific language). Nếu các bạn nhìn thấy code SwiftUI khi vừa học Swift thì các bạn sẽ thấy rất lạ lẫm vì syntax trông không giốngs Swift lắm. Bài viết sẽ giải thích DSL của SwiftUI, tại sao chúng ta lại viết được SwiftUI như cách đó, Swift Evolution nào được Apple cập nhật để hỗ trợ cho việc viết SwiftUI. Theo cá nhân mình, việc hiểu về DSL của SwiftUI không phải là điều bắt buộc phải biết khi bạn học SwiftUI, nhưng biết về nó sẽ giúp bạn học SwiftUI nhanh hơn.

## MVI, MVP, MVVM và SwiftUI

MVI (Model-View-Intent) là một kiến trúc khá phổ biến bên Android, nhưng tương đối xa lại bên iOS. MVP (Model-View-Presenter) thì có phổ biến hơn, được dùng nhiều trong các app sử dung UIKit. Tuần vừa rồi mình có đọc[ một bài viết phân tích việc sử dụng MVI](https://medium.com/better-programming/mvi-architecture-for-swiftui-apps-cff44428394) và [một bài viết khác sử dụng MVP](https://lascorbe.com/posts/2020-04-27-MVPCoordinators-SwiftUI-part1/) cho ứng dụng viết bằng SwiftUI. Nếu các bạn còn nhớ trong [bản tin số 1](https://swiftvietnam.com/posts/2020-05-20_ban_tin_swift_vietnam_so_1/) và [bản tin số 2](https://swiftvietnam.com/posts/2020-05-27_ban_tin_swift_vietnam_so_2/) mình có giới thiệu 2 kiến trúc [The Composable Architecture](https://github.com/pointfreeco/swift-composable-architecture) và [Bow-Arch](https://arch.bow-swift.io/) dựa trên kiến trúc unidirectional. Tất nhiên nếu bạn đã quen với MVVM cho app sử dụng UIKit, bạn có thể tiếp tục sử dụng kiến trúc này với [SwiftUI và Combine](https://medium.com/flawless-app-stories/mvvm-in-swiftui-8a2e9cc2964a). Mình có làm một ứng dụng mẫu để trình diễn MVVM cho SwiftUI [tại đây](https://github.com/antranapp/PixabaySwiftUICombine). Bạn có thể tham khảo những bài viết này để tìm ra kiến trúc thích hợp cho ứng dụng của mình nhé.

## Responsive design with UIStackView

`UIStackView` là một công cụ khá hữu ích nếu các bạn sử dụng Auto layout. Bạn [Sarun Wongpatcharapakorn](https://sarunw.com/) có một bài viết khá hữu ích hướng dẫn cách sử dụng `UIStackView` để thiết kế app responsive, hoạt động tốt trên các thiết bị có các size classes khá nhau. Các bạn xem chi tiết [tại đây](https://sarunw.com/posts/responsive-design-with-uistackview).

# Công cụ

## iOS Dev Search

Nếu các bạn là người tò mò và muốn đọc nhiều bài viết về iOS development, các bạn có thể truy cập trang [iOS Dev Search](https://iosdevsearch.com/). Trang web này tổng hợp link từ hơn 550 blogs liên quan đến iOS development. Danh sách các blog này các bạn có thể xem trên [iOS Dev Directory](https://iosdevdirectory.com/). Happy reading :)

## WWDC cho MacOS

Nếu các bạn muốn xem lại các videos của các kỳ WWDC trước offline trên máy Mac của mình thì app [WWDC for MacOS](https://wwdc.io/) là công cụ không thể thiếu. Videos được phân loại theo năm và chủ đề. Tuần này, bạn [Rambo](https://rambo.codes/) đã cập nhật công cụ này lên phiên bản 7 và có thê chức năng community để chia sẻ tin tức của cộng đồng. 

![wwdcio](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/wwdcio.png)

Tranh thủ quảng cáo một tí, mình cũng có làm một app có tên là [SwiftCommunity](https://swiftcommunity.app/), [mã nguồn mở](https://github.com/superarcswift/SwiftCommunity). 

![swiftcommunity](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/swiftcommunity.png)

# Vui

Bạn nào sử dụng Windows bây giờ thì [không còn lý do gì](https://twitter.com/daniel_duan/status/1266052118462394368) để không học Swift nữa nhé 😉.

# Lời cuối

Thực ra tuần này mình khá bận với công việc, nhưng mình vẫn cố gắng viết cho xong bài này để đăng kịp vào thứ 4. Vấn đề là mình không có gì để viết mà là mình thấy viết bài kỹ thuật bằng tiếng Việt quả thật không phải đơn giản. Thế nên các bạn thông cảm nếu mình sử dụng nhiều từ tiếng Anh nhé vì mình khá lười dịch nó sang tiếng Việt :D.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.

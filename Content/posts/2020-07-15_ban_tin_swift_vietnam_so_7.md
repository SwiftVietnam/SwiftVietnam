---
date: 2020-07-15 08:21
description: Bản tin Swift Việt Nam #7
tags: news
---

![7](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/7/swiftvietnam_7.png)

# Bản tin Swift Việt Nam #7

Tuần trước mình bận việc nhiều quá nên không có thời gian để viết bản tin. Mục tiêu của mình là phát hành Bản Tin Swift hàng tuần. Nhưng vì mình muốn đảm bảo chất lượng cho bản tin này nên mình muốn dành thời gian nghiên cứu và sưu tầm những thông tin đáng quan tâm nhất thay vì phát hành theo số lượng. Tuy nhiên công việc này đòi hỏi khá nhiều thời gian tìm hiểu, đọc và tóm tắt, và mình làm tất cả các công việc này trong free time song song với công việc hằng ngày và gia đình nên các bạn thông cảm là thỉnh thoảng mình sẽ skip một vài tuần nhé 😋.

# Swift:

## Swift deep dive:

Sau WWDC là quãng thời gian rất bận rộn của developer vì chúng ta cần phải cập nhật kiến thức mới và chuẩn bị cho các phiên bản hệ điều hành sắp phát hành của Apple. Trong bài #6 mình có giới thiệu sơ về các APIs mới xuất hiện trong Swift 5.2/5.3. Apple vừa phát hảnh [danh sách tổng hợp](https://developer.apple.com/news/?id=tjv7v7k1) những video liên quan đến Swift tại WWDC20 để chúng ta tiện theo dõi.

## Swift in Xcode 12:

Xcode 12 ngoài việc có giao diện mới còn có rất nhiều thứ mới mẻ liên quan đên Compiler/Swift. Các bạn theo dõi các video [tại đây](https://developer.apple.com/news/?id=4nh602ih) để biết thêm chi tiết nhé.

# Bài viết:

## Có gì mới trong UIKit cho iOS 14:

Apple đã đầu tư rất nhiều cho SwiftUI nhưng UIKit vẫn là thành phần không thể thiếu cho các Apple platforms. Trong WWDC20, Apple cũng ra giới thiệu rất nhiều APIs mới dành cho UIKit. Bạn có thể xem tổng hợp về những điểm mới trong UIKit [tại đây](https://www.swiftjectivec.com/ios-14-notable-uikit-additions/) nhé.

## MatchedGeometryEffect

SwiftUI 2.0 có giới thiệu một hiệu ứng animation mới tên là `MatchedGeometryEffect' rất hay. Giải thích đơn giản là bạn có thể tạo ra hiệu ứng chuyển động như trong hình chỉ bằng vài dòng code trong SwiftUI.

![7](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/7/small-loop-1.gif)

Bạn có thể đọc hướng dẫn chi tiết cách sử dụng Effect này tại đây: [phần 1](https://swiftui-lab.com/matchedgeometryeffect-part1/), [phần 2](https://swiftui-lab.com/matchedgeometryeffect-part2/)

## Sử dụng `UICollectionView` như `UITableView`

Trong bản tin Swift Việt Nam số #6, mình có giới thiệu một số API mới của `UICollectionView` giúp chúng ta có thể sự dụng nó như `UITableView`. Trong số này mình xin giới thiệu một bài viết chi tiết cách sử dụng các API này [tại đây](https://useyourloaf.com/blog/creating-lists-with-collection-view/) nhé.

![7](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/7/tableview.png)


# Mã nguồn:

## SwiftUI-Kit

Ứng dụng mã nguồn mở showcases các thành phần UI của SwiftUI cho tất cả các Apple Platforms. Nếu bạn đang bắt đầu học SwiftUI thì đây là một ứng dụng rất hữu ích để tra cứu nhanh các controls của SwiftUI.
Các bạn xem chi tiết về SwiftUI-Kit [tại đây](https://github.com/jordansinger/SwiftUI-Kit)

## RedditOS

![7](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/7/redditos.png)

Những ai đã theo dõi SwiftUI từ năm ngoái chắc hẳn không lạ gì anh bạn [Thomas Ricouard](https://github.com/Dimillian) với ứng dụng mã nguồn mở [MovieSwiftUI](https://github.com/Dimillian/MovieSwiftUI). Ứng dụng này là một trong những ứng dụng phức tạp được viết bằng SwiftUI đầu tiên, và nó được [Swift team sử dụng](https://twitter.com/Dimillian/status/1276069357550960641) benchmark SwiftUI phiên bản 2. Anh bạn này sau đấy còn phát hành một app open source nữa viết bằng SwiftUI [dành cho fan của game Animal Crossing](https://github.com/Dimillian/ACHNBrowserUI). Và trong tuần này, anh bạn Thomas lại đã giới thiệu thêm một ứng dụng mã nguồn mở khác có tên là [RedditOS](https://github.com/Dimillian/RedditOS). Theo mình các ứng dụng này là resources rất tốt để học về SwiftUI.

# Công cụ:

## Difference

Đây là một framework giúp cho bạn dễ dàng nhìn thấy sự khác nhau giữa 2 objects khi các bạn so sánh bằng `XCTAssertEqual` trong unit tests. Cái này rất hữu ích để nhận biết nhanh tests của các bạn lỗi ở đâu, giúp cho việc sửa chúng dễ dàng hơn.

![7](https://raw.githubusercontent.com/SwiftVietnam/SwiftVietnam/master/Output/Images/swiftvietnam/7/difference.png)

Các bạn có thể xem chi tiết về [Difference](https://github.com/krzysztofzablocki/Difference) tại đây

## hidden

Đây là một công cụ mã nguồn mở dùng để ẩn icon trên Menu bar của máy Mac hiện đang trending trên Github. Nguyên nhân chính mình giới thiệu app này tại đây là vì nó được phát triển bở một công ty Việt Nam: [Dwarves Foundation](https://dwarves.foundation)

Các bạn xem chi tiết về hidden [tại đây](https://github.com/dwarvesf/hidden)

## FNMNetworkMonitor

`FNMNetworkMonitor` là framework dùng để theo dõi và ghi lại các hoạt động mạng của ứng dụng iOS, phục vụ cho việc debug code liên quan networking. Ngoài ra `FNMNetworkMonitor` còn có thể được sử dụng để mock các requests cho ứng dụng iOS, giúp ích cho việc kiểm tra lỗi và test ứng dụng.

Các bạn xem chi tiết về `FNMNetworkMonitor` [tại đây](https://github.com/Farfetch/network-monitor-ios)

## SwiftUI Property Wrappers

SwiftUI 2.0 giới thiệu rất nhiều Property Wrappers mới. Việc hiểu và sử dụng cá PW này không phải là việc đơn giản, đặc biệt là những ai mới làm quen với SwiftUI.

Anh bạn [Donny Wals](https://www.donnywals.com/) có tổng hợp các PWs và hướng dẫn cách sử dụng chúng [tại đây](https://swiftuipropertywrappers.com/) để các bạn tham khảo nhé.

# Hài hước

[Mèo 😹](https://twitter.com/Valzevul/status/1275164878056103936?s=20)

# Lời kết:

Nếu các bạn có các bài viết liên quan đến Swift, WWDC và muốn chia sẻ với cộng động thì các bạn [kết nối với mình](https://www.facebook.com/tran.binhan) để thảo luận thêm nhé.

Các bạn cũng nhớ theo dõi trang [Facebook Swift Việt Nam](https://www.facebook.com/Swift-Vi%E1%BB%87t-Nam-396835394265318) để được cập nhật các thông tin mới nhất về Swift và cộng đồng lập trình viên Swift Việt Nam nhé.
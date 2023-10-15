// swift-tools-version:5.4

import PackageDescription

let package = Package(
    name: "SwiftVietnam",
    products: [
        .executable(name: "SwiftVietnam", targets: ["SwiftVietnam"])
    ],
    dependencies: [
        .package(url: "https://github.com/johnsundell/publish.git", from: "0.7.0"),
        //.package(url: "https://github.com/Ze0nC/SwiftPygmentsPublishPlugin", .branch("master"))
    ],
    targets: [
        .executableTarget(
            name: "SwiftVietnam",
            dependencies: [
                .product(name: "Publish", package: "publish"), 
                //"SwiftPygmentsPublishPlugin"
            ]
        )
    ]
)
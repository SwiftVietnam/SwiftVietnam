// swift-tools-version:5.1

import PackageDescription

let package = Package(
    name: "SwiftVietnam",
    products: [
        .executable(name: "SwiftVietnam", targets: ["SwiftVietnam"])
    ],
    dependencies: [
        .package(url: "https://github.com/johnsundell/publish.git", from: "0.3.0"),
        .package(url: "https://github.com/Ze0nC/SwiftPygmentsPublishPlugin", .branch("master"))
    ],
    targets: [
        .target(
            name: "SwiftVietnam",
            dependencies: [
                "Publish", 
                "SwiftPygmentsPublishPlugin"
            ]
        )
    ]
)
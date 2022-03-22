# SDConnect Mobile Frontend

This is the mobile browser and app of SDConnect project.

## Prerequisites

- Flutter SDK: [Installation and Setup guide](https://docs.flutter.dev/get-started/install)
- Android Studio (optional): [Setup guide for Flutter](https://docs.flutter.dev/get-started/install)
- VSCode (optional)

## Run the app

### With Android Studio (recommended)

1. Open this directory (**mobile**) in **Android Studio**.
2. Choose a device/browser to run the app on (open any simulator/emulator in advance if needed).
3. Click on the run button on top right corner.

For more information: [Read this docs](https://docs.flutter.dev/get-started/test-drive?tab=androidstudio)

### With Command Line

1. Go to this directory (**mobile**):

    ```bash
    cd path/to/this/repo/mobile
    ```

2. Download the Dependencies/Packages:

    ```dart
    flutter pub get
    ```

3. List all devices available:

    ```bash
    flutter devices
    ```

    Example:

    ```bash
    flutter devices
    2 connected devices:

    macOS (desktop) • macos  • darwin-arm64   • macOS 12.0.1 21A559 darwin-arm
    Chrome (web)    • chrome • web-javascript • Google Chrome 99.0.4844.83
    ```

4. (Optional) If you want to run the app on any Android/iOS devices, please open the emulator/simulator needed. Then run ```flutter devices``` to make sure it's available to run the app.

    Example:
    >
    > Open iOS Simulator:
    >
    >```bash
    >open -a Simulator.app
    >```
    >
    > List all devices:
    >
    >```bash
    >flutter devices
    >3 connected devices:
    >
    >iPhone SE (3rd generation) (mobile) • 85A7BFA8-A090-4D42-9814-E7E577AE10AA • ios            • com.apple.CoreSimulator.SimRuntime.iOS-15-4 (simulator)
    >macOS (desktop)                     • macos                                • darwin-arm64   • macOS 12.0.1 21A559 darwin-arm
    >Chrome (web)                        • chrome                               • web-javascript • Google Chrome 99.0.4844.83
    >```
    >
    > In this example, the ```<deviceId>``` of the simulator is ```85A7BFA8-A090-4D42-9814-E7E577AE10AA```

5. Run the app with the ```<deviceId>``` you get from the previous step (second column):

    ```bash
    flutter run -d <deviceId>
    ```

    For example:

    ```bash
    flutter run -d chrome # Run the app on Chrome web browser
    ```

## For more information

Go to this [docs](https://docs.flutter.dev/get-started/test-drive) for more information on running Flutter app.

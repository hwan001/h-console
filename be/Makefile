.PHONY: build clean run proto proto-gen

build:
	./gradlew build

clean:
	./gradlew clean

run:
	java -jar ./build/libs/hconsole-0.0.1-SNAPSHOT.jar

proto: proto-gen

proto-gen:
	./gradlew clean generateProto

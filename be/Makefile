.PHONY: build clean run proto-gen

build:
	./gradlew build

clean:
	./gradlew clean

run:
	java -jar ./build/libs/hconsole-0.0.1-SNAPSHOT.jar

proto-gen:
	./gradlew clean generateProto

# Imagen base con Java 21
FROM eclipse-temurin:21-jdk-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el wrapper y el pom para cachear dependencias
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Descargamos dependencias (acelera builds)
RUN ./mvnw -q -B dependency:go-offline

# Copiamos el código fuente
COPY src src

# Construimos el jar (sin tests; los tests corren en CI)
RUN ./mvnw -q -B clean package -DskipTests

# Puerto default de Spring Boot
EXPOSE 8080

# Ejecutar la app
CMD ["java", "-jar", "target/loyalty-os-0.0.1-SNAPSHOT.jar"]
<?php
//* Clase para gestionar la conexión a la base de datos
class MySQL
{

    //! Datos de conexión
    //* Conexion clever
    // private $ipServidor = "bpuff7qnjb6yc3odeeul-mysql.services.clever-cloud.com"; //
    // private $usuarioBase = "uodrkbidieoxt1m5";
    // private $contrasena = "wKdffoboIV1ljB1u5QaI";
    // private $nombreBaseDatos = "bpuff7qnjb6yc3odeeul";
    
    //* Conexion local
    private $ipServidor = "localhost";
    private $usuarioBase = "root";
    private $contrasena = "";
    private $nombreBaseDatos = "kahoot";
    
    private $conexion;

    //* Método para conectar a la base de datos
    public function conectar()
    {
        $this->conexion = mysqli_connect($this->ipServidor, $this->usuarioBase, $this->contrasena, $this->nombreBaseDatos);

        //! Validar si hubo un error en la conexión
        if (!$this->conexion) {
            die("Error al conectar a la base de datos: " . mysqli_connect_error());
        }

        //! Establecer codificación utf8
        mysqli_set_charset($this->conexion, "utf8");
    }

    //* Método para desconectar la base de datos
    public function desconectar()
    {
        if ($this->conexion) {
            mysqli_close($this->conexion);
        }
    }

    //* Método para ejecutar una consulta y devolver su resultado
    public function efectuarConsulta($consulta)
    {
        //! Verificar que la codificación sea utf8 antes de ejecutar
        mysqli_query($this->conexion, "SET NAMES 'utf8'");
        mysqli_query($this->conexion, "SET CHARACTER SET 'utf8'");

        $resultado = mysqli_query($this->conexion, $consulta);

        if (!$resultado) {
            echo "Error en la consulta: " . mysqli_error($this->conexion);
        }

        return $resultado;
    }
}

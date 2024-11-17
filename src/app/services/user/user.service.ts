import { Injectable } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = []; // Almacenamiento temporal en memoria

  constructor() {}

  // Registrar un nuevo usuario
  registerUser(user: User): void {
    this.users.push(user);
  }

  // Devuelve el usuario sin la contraseña
  findUser(email: string, password: string): Omit<User, 'password'> | null {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  // Obtener todos los usuarios (solo para verificar)
  getAllUsers(): User[] {
    return this.users;
  }
}

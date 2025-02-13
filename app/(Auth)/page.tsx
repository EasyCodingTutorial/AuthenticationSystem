
import styles from "./page.module.css";

// For Components
import AuthWrapper from "@/app/Components/AuthWrapper/AuthWrapper";
import { AuthForm } from "@/app/Components/AuthForm/AuthForm";

export default function Home() {
  return (
     <AuthWrapper>
       <AuthForm/>
     </AuthWrapper>
  );
}

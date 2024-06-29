import type React from "react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useBlocker } from "./hooks";

interface FormValues {
	name: string;
}

export const Home: React.FC = () => {
	const { register, handleSubmit, watch } = useForm<FormValues>();
	const [isBlocked, setIsBlocked] = useState<boolean>(true);
	const formValues = watch(); // フォームの値を監視

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
		setIsBlocked(false);
		alert("保存されました");
	};

	useBlocker(() => {}, isBlocked);

	return (
		<div>
			<h1>ホーム</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("name", { required: true })}
					placeholder="名前を入力"
					onChange={() => setIsBlocked(true)} // フォームが変更されたらブロックを有効にする
				/>
				<button type="submit">保存</button>
			</form>
		</div>
	);
};

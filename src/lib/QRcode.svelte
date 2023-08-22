<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { onMount } from "svelte";
	import Button from "./components/ui/button/button.svelte";
  
   // @ts-ignore
   import { default as QrCode } from 'qrious';


    export let value = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

	const QRcode = new QrCode();

	export let errorCorrection = 'L';
	export let background = '#fff';
	export let color = '#000';
	export let size = '300';
	export let padding = 5;
	// export let className = 'qrcode';

	let image = '';

	function generateQrCode() {
		QRcode.set({
			background,
			foreground: color,
			level: errorCorrection,
			padding,
			size,
			value
		});

		image = QRcode.toDataURL('image/jpeg');
	}

	export function getImage() {
		return image;
	}

	$: {
		if (value) {
			generateQrCode();
		}
	}

	onMount(() => {
		generateQrCode();
	});
  
  </script>
  <AlertDialog.Root>
    <AlertDialog.Trigger><Button>
        Abrir QR code
    </Button></AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>QRCode</AlertDialog.Title>
        
        <img src={image} alt={value}>
        <!-- <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </AlertDialog.Description> -->
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Voltar</AlertDialog.Cancel>
        <!-- <AlertDialog.Action>Continue</AlertDialog.Action> -->
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>